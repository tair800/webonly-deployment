using System.ComponentModel.DataAnnotations;

namespace WebOnlyAPI.Models
{
    public class Equipment
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(100)]
        public string? Version { get; set; }
        
        [StringLength(100)]
        public string? Core { get; set; }
        
        [StringLength(2000)]
        public string? Description { get; set; }
        
        [StringLength(500)]
        public string? ImageUrl { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        public ICollection<EquipmentFeature> FeaturesList { get; set; } = new List<EquipmentFeature>();
        public ICollection<EquipmentSpecification> Specifications { get; set; } = new List<EquipmentSpecification>();
        public ICollection<EquipmentCategoryMapping> CategoryMappings { get; set; } = new List<EquipmentCategoryMapping>();
        public ICollection<EquipmentTagMapping> TagMappings { get; set; } = new List<EquipmentTagMapping>();
    }
}
