using Microsoft.EntityFrameworkCore;
using WebOnlyAPI.Data;
using WebOnlyAPI.DTOs;
using WebOnlyAPI.Models;

namespace WebOnlyAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProductResponseDto>> GetAllProductsAsync()
        {
            var products = await _context.Products
                .Include(p => p.Images)
                .OrderBy(p => p.CreatedAt)
                .ToListAsync();

            return products.Select(MapToResponseDto);
        }

        public async Task<ProductResponseDto?> GetProductByIdAsync(int id)
        {
            var product = await _context.Products
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);
            return product != null ? MapToResponseDto(product) : null;
        }

        public async Task<ProductResponseDto> CreateProductAsync(CreateProductDto createDto)
        {
            var product = new Product
            {
                Name = createDto.Name,
                Subtext = createDto.Subtext,
                ImageUrl = createDto.ImageUrl,
                Icon = createDto.Icon,
                DetailDescription = createDto.DetailDescription,
                Section1Title = createDto.Section1Title,
                Section1Description = createDto.Section1Description,
                Section1MoreText = createDto.Section1MoreText,
                Section1Image = createDto.Section1Image,
                Section2Title = createDto.Section2Title,
                Section2Description = createDto.Section2Description,
                Section2MoreText = createDto.Section2MoreText,
                Section2Image = createDto.Section2Image,
                Section3Title = createDto.Section3Title,
                Section3Description = createDto.Section3Description,
                Section3MoreText = createDto.Section3MoreText,
                Section3Image = createDto.Section3Image,
                CreatedAt = DateTime.UtcNow
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return MapToResponseDto(product);
        }

        public async Task<ProductResponseDto?> UpdateProductAsync(int id, UpdateProductDto updateDto)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return null;

            product.Name = updateDto.Name;
            product.Subtext = updateDto.Subtext;
            product.ImageUrl = updateDto.ImageUrl;
            if (!string.IsNullOrWhiteSpace(updateDto.Icon)) product.Icon = updateDto.Icon;
            product.DetailDescription = updateDto.DetailDescription;
            product.Section1Title = updateDto.Section1Title;
            product.Section1Description = updateDto.Section1Description;
            product.Section1MoreText = updateDto.Section1MoreText;
            product.Section1Image = updateDto.Section1Image;
            product.Section2Title = updateDto.Section2Title;
            product.Section2Description = updateDto.Section2Description;
            product.Section2MoreText = updateDto.Section2MoreText;
            product.Section2Image = updateDto.Section2Image;
            product.Section3Title = updateDto.Section3Title;
            product.Section3Description = updateDto.Section3Description;
            product.Section3MoreText = updateDto.Section3MoreText;
            product.Section3Image = updateDto.Section3Image;
            product.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return MapToResponseDto(product);
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return true;
        }

        private static ProductResponseDto MapToResponseDto(Product product)
        {
            return new ProductResponseDto
            {
                Id = product.Id,
                Name = product.Name,
                Subtext = product.Subtext,
                Icon = product.Icon,
                Alt = product.Alt,
                Path = product.Path,
                MainImage = product.MainImage,
                ImageUrl = product.ImageUrl,
                DetailDescription = product.DetailDescription,
                CreatedAt = product.CreatedAt,
                UpdatedAt = product.UpdatedAt,
                Section1Title = product.Section1Title,
                Section1Description = product.Section1Description,
                Section1MoreText = product.Section1MoreText,
                Section1Image = product.Section1Image,
                Section2Title = product.Section2Title,
                Section2Description = product.Section2Description,
                Section2MoreText = product.Section2MoreText,
                Section2Image = product.Section2Image,
                Section3Title = product.Section3Title,
                Section3Description = product.Section3Description,
                Section3MoreText = product.Section3MoreText,
                Section3Image = product.Section3Image,
                Images = product.Images?.OrderBy(i => i.OrderIndex).Select(i => new ProductImageDto
                {
                    Id = i.Id,
                    ImageUrl = i.ImageUrl,
                    Alt = i.Alt,
                    OrderIndex = i.OrderIndex
                }).ToList() ?? new List<ProductImageDto>()
            };
        }

        public async Task<IEnumerable<ProductImageDto>> GetImagesAsync(int productId)
        {
            var images = await _context.ProductImages
                .Where(pi => pi.ProductId == productId)
                .OrderBy(pi => pi.OrderIndex)
                .ToListAsync();
            return images.Select(i => new ProductImageDto { Id = i.Id, ImageUrl = i.ImageUrl, Alt = i.Alt, OrderIndex = i.OrderIndex });
        }

        public async Task<ProductImageDto> AddImageAsync(int productId, ProductImageDto dto)
        {
            var maxOrder = await _context.ProductImages.Where(pi => pi.ProductId == productId).MaxAsync(pi => (int?)pi.OrderIndex) ?? -1;
            var entity = new ProductImage
            {
                ProductId = productId,
                ImageUrl = dto.ImageUrl,
                Alt = dto.Alt,
                OrderIndex = maxOrder + 1
            };
            _context.ProductImages.Add(entity);
            await _context.SaveChangesAsync();
            return new ProductImageDto { Id = entity.Id, ImageUrl = entity.ImageUrl, Alt = entity.Alt, OrderIndex = entity.OrderIndex };
        }

        public async Task<bool> DeleteImageAsync(int productId, int imageId)
        {
            var entity = await _context.ProductImages.FirstOrDefaultAsync(pi => pi.Id == imageId && pi.ProductId == productId);
            if (entity == null) return false;
            _context.ProductImages.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ProductImageDto?> UpdateImageAsync(int productId, int imageId, ProductImageDto dto)
        {
            var entity = await _context.ProductImages.FirstOrDefaultAsync(pi => pi.Id == imageId && pi.ProductId == productId);
            if (entity == null) return null;
            if (!string.IsNullOrWhiteSpace(dto.ImageUrl)) entity.ImageUrl = dto.ImageUrl;
            entity.Alt = dto.Alt;
            entity.OrderIndex = dto.OrderIndex;
            await _context.SaveChangesAsync();
            return new ProductImageDto { Id = entity.Id, ImageUrl = entity.ImageUrl, Alt = entity.Alt, OrderIndex = entity.OrderIndex };
        }

        public async Task<bool> SetMainImageAsync(int productId, int imageId)
        {
            var img = await _context.ProductImages.FirstOrDefaultAsync(x => x.Id == imageId && x.ProductId == productId);
            var prod = await _context.Products.FirstOrDefaultAsync(x => x.Id == productId);
            if (img == null || prod == null) return false;
            prod.ImageUrl = img.ImageUrl;
            prod.MainImage = img.ImageUrl;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<ProductResponseDto>> SearchByNameAsync(string searchTerm)
        {
            var results = await _context.Products
                .Include(p => p.Images)
                .Where(p => p.Name.ToLower().StartsWith(searchTerm.ToLower()))
                .OrderBy(p => p.CreatedAt)
                .ToListAsync();

            return results.Select(MapToResponseDto);
        }
    }
}
