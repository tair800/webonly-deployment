using System.ComponentModel.DataAnnotations;

namespace WebOnlyAPI.Models
{
    public class EquipmentFeature
    {
        public int Id { get; set; }
        
        [Required]
        public int EquipmentId { get; set; }
        public Equipment Equipment { get; set; } = null!;
        
        [Required]
        [StringLength(200)]
        public string Feature { get; set; } = string.Empty;
        
        public int OrderIndex { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
