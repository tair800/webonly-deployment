using Microsoft.EntityFrameworkCore;
using WebOnlyAPI.Data;
using WebOnlyAPI.DTOs;
using WebOnlyAPI.Models;

namespace WebOnlyAPI.Services
{
    public class ServiceService : IServiceService
    {
        private readonly ApplicationDbContext _context;

        public ServiceService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ServiceResponseDto>> GetAllServicesAsync()
        {
            var services = await _context.Services
                .OrderBy(s => s.Id)
                .ToListAsync();

            return services.Select(MapToResponseDto);
        }

        public async Task<ServiceResponseDto?> GetServiceByIdAsync(int id)
        {
            var service = await _context.Services
                .FirstOrDefaultAsync(s => s.Id == id);

            return service != null ? MapToResponseDto(service) : null;
        }

        public async Task<ServiceResponseDto> CreateServiceAsync(CreateServiceDto createServiceDto)
        {
            var service = new Service
            {
                Name = createServiceDto.Name,
                Subtitle = createServiceDto.Subtitle,
                Icon = createServiceDto.Icon,
                DetailImage = createServiceDto.DetailImage,
                Description = createServiceDto.Description,
                Subtext = createServiceDto.Subtext,
                ImageUrl = createServiceDto.ImageUrl,
                CreatedAt = DateTime.UtcNow
            };

            _context.Services.Add(service);
            await _context.SaveChangesAsync();

            return MapToResponseDto(service);
        }

        public async Task<ServiceResponseDto?> UpdateServiceAsync(int id, UpdateServiceDto updateServiceDto)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null)
                return null;

            service.Name = updateServiceDto.Name;
            service.Subtitle = updateServiceDto.Subtitle;
            service.Icon = updateServiceDto.Icon;
            service.DetailImage = updateServiceDto.DetailImage;
            service.Description = updateServiceDto.Description;
            service.Subtext = updateServiceDto.Subtext;
            service.ImageUrl = updateServiceDto.ImageUrl;
            service.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return MapToResponseDto(service);
        }

        public async Task<bool> DeleteServiceAsync(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null)
                return false;

            _context.Services.Remove(service);
            await _context.SaveChangesAsync();

            return true;
        }

        private static ServiceResponseDto MapToResponseDto(Service service)
        {
            return new ServiceResponseDto
            {
                Id = service.Id,
                Name = service.Name,
                Subtitle = service.Subtitle,
                Icon = service.Icon,
                DetailImage = service.DetailImage,
                Description = service.Description,
                Subtext = service.Subtext,
                ImageUrl = service.ImageUrl,
                CreatedAt = service.CreatedAt,
                UpdatedAt = service.UpdatedAt
            };
        }
    }
}
