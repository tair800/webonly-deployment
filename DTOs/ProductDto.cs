namespace WebOnlyAPI.DTOs
{
    public class CreateProductDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Subtext { get; set; }
        public string? ImageUrl { get; set; }
        public string? Icon { get; set; }
        public string? DetailDescription { get; set; }
        public string? Section1Title { get; set; }
        public string? Section1Description { get; set; }
        public string? Section1MoreText { get; set; }
        public string? Section1Image { get; set; }
        public string? Section2Title { get; set; }
        public string? Section2Description { get; set; }
        public string? Section2MoreText { get; set; }
        public string? Section2Image { get; set; }
        public string? Section3Title { get; set; }
        public string? Section3Description { get; set; }
        public string? Section3MoreText { get; set; }
        public string? Section3Image { get; set; }
    }

    public class UpdateProductDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Subtext { get; set; }
        public string? ImageUrl { get; set; }
        public string? Icon { get; set; }
        public string? DetailDescription { get; set; }
        public string? Section1Title { get; set; }
        public string? Section1Description { get; set; }
        public string? Section1MoreText { get; set; }
        public string? Section1Image { get; set; }
        public string? Section2Title { get; set; }
        public string? Section2Description { get; set; }
        public string? Section2MoreText { get; set; }
        public string? Section2Image { get; set; }
        public string? Section3Title { get; set; }
        public string? Section3Description { get; set; }
        public string? Section3MoreText { get; set; }
        public string? Section3Image { get; set; }
    }

    public class ProductResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Subtext { get; set; }
        public string? Icon { get; set; }
        public string? Alt { get; set; }
        public string? Path { get; set; }
        public string? MainImage { get; set; }
        public string? ImageUrl { get; set; }
        public string? DetailDescription { get; set; }
        public string? Section1Title { get; set; }
        public string? Section1Description { get; set; }
        public string? Section1MoreText { get; set; }
        public string? Section1Image { get; set; }
        public string? Section2Title { get; set; }
        public string? Section2Description { get; set; }
        public string? Section2MoreText { get; set; }
        public string? Section2Image { get; set; }
        public string? Section3Title { get; set; }
        public string? Section3Description { get; set; }
        public string? Section3MoreText { get; set; }
        public string? Section3Image { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public List<ProductImageDto> Images { get; set; } = new();
    }

    public class ProductImageDto
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string? Alt { get; set; }
        public int OrderIndex { get; set; }
    }
}
