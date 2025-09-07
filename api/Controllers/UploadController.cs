using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace WebOnlyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : ControllerBase
    {
        [HttpPost("product/{productId}")]
        [RequestSizeLimit(20_000_000)]
        public async Task<ActionResult<object>> UploadProductImage(int productId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("File is empty");

            var uploadsRoot = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "products", productId.ToString());
            Directory.CreateDirectory(uploadsRoot);
            var safeFileName = Path.GetFileName(file.FileName);
            var stamped = $"{DateTime.UtcNow:yyyyMMddHHmmssfff}_{safeFileName}";
            var fullPath = Path.Combine(uploadsRoot, stamped);
            using (var stream = System.IO.File.Create(fullPath))
            {
                await file.CopyToAsync(stream);
            }
            var urlPath = $"/uploads/products/{productId}/{stamped}";
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            return Ok(new { url = baseUrl + urlPath });
        }

        [HttpPost("equipment/{equipmentId}")]
        [RequestSizeLimit(20_000_000)]
        public async Task<ActionResult<object>> UploadEquipmentImage(int equipmentId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("File is empty");

            var uploadsRoot = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "equipment");
            Directory.CreateDirectory(uploadsRoot);
            var safeFileName = Path.GetFileName(file.FileName);
            var stamped = $"{DateTime.UtcNow:yyyyMMddHHmmssfff}_{safeFileName}";
            var fullPath = Path.Combine(uploadsRoot, stamped);
            using (var stream = System.IO.File.Create(fullPath))
            {
                await file.CopyToAsync(stream);
            }
            var urlPath = $"/uploads/equipment/{stamped}";
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            return Ok(new { url = baseUrl + urlPath });
        }
    }
}


