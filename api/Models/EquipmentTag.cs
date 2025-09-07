using System.ComponentModel.DataAnnotations;

namespace WebOnlyAPI.Models
{
    public class EquipmentTag
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [MaxLength(500)]
        public string? Description { get; set; }
        
        [MaxLength(7)]
        public string? Color { get; set; }
        
        public int OrderIndex { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        public virtual ICollection<EquipmentTagMapping> EquipmentMappings { get; set; } = new List<EquipmentTagMapping>();
    }
}

