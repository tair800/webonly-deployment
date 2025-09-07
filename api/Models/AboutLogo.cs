using System.ComponentModel.DataAnnotations;

namespace WebOnlyAPI.Models
{
    public class AboutLogo
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(200)]
        public string Heading { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(2000)]
        public string Subtext { get; set; } = string.Empty;
        
        [MaxLength(500)]
        public string? ImageUrl { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
    }
}
