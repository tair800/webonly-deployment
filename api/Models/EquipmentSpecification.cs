using System.ComponentModel.DataAnnotations;

namespace WebOnlyAPI.Models
{
    public class EquipmentSpecification
    {
        public int Id { get; set; }
        
        [Required]
        public int EquipmentId { get; set; }
        public Equipment Equipment { get; set; } = null!;
        
        [Required]
        [StringLength(100)]
        public string Key { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Value { get; set; }
        
        public int OrderIndex { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
