using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebOnlyAPI.DTOs
{
    public class CreateServiceDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(100)]
        public string? Subtitle { get; set; }

        [StringLength(100)]
        public string? Icon { get; set; }

        [StringLength(500)]
        public string? DetailImage { get; set; }

        [StringLength(2000)]
        public string? Description { get; set; }

        [StringLength(1000)]
        public string? Subtext { get; set; }

        [StringLength(500)]
        public string? ImageUrl { get; set; }
    }

    public class UpdateServiceDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(100)]
        public string? Subtitle { get; set; }

        [StringLength(100)]
        public string? Icon { get; set; }

        [StringLength(500)]
        public string? DetailImage { get; set; }

        [StringLength(2000)]
        public string? Description { get; set; }

        [StringLength(1000)]
        public string? Subtext { get; set; }

        [StringLength(500)]
        public string? ImageUrl { get; set; }
    }

    public class ServiceResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Subtitle { get; set; }
        public string? Icon { get; set; }
        public string? DetailImage { get; set; }
        public string? Description { get; set; }
        public string? Subtext { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
