using System.ComponentModel.DataAnnotations;

namespace WebOnlyAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string? Subtext { get; set; }
        
        [StringLength(100)]
        public string? Icon { get; set; }
        
        [StringLength(100)]
        public string? Alt { get; set; }
        
        [StringLength(100)]
        public string? Path { get; set; }
        
        [StringLength(500)]
        public string? MainImage { get; set; }
        
        [StringLength(2000)]
        public string? Description { get; set; }
        
        [StringLength(500)]
        public string? ImageUrl { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        
        // Detail text fields (Unicode)
        public string? DetailDescription { get; set; }
        public string? Section1Title { get; set; }
        public string? Section1Description { get; set; }
        public string? Section1MoreText { get; set; }
        [StringLength(500)]
        public string? Section1Image { get; set; }

        public string? Section2Title { get; set; }
        public string? Section2Description { get; set; }
        public string? Section2MoreText { get; set; }
        [StringLength(500)]
        public string? Section2Image { get; set; }

        public string? Section3Title { get; set; }
        public string? Section3Description { get; set; }
        public string? Section3MoreText { get; set; }
        [StringLength(500)]
        public string? Section3Image { get; set; }

        // Navigation properties
        public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
    }
}
