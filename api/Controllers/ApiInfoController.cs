using Microsoft.AspNetCore.Mvc;

namespace WebOnlyAPI.Controllers
{
    [ApiController]
    [Route("api")]
    public class ApiInfoController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetApiInfo()
        {
            var apiInfo = new
            {
                name = "WebOnlyAPI",
                version = "1.0.0",
                description = "WebOnly API for managing equipment, products, services, and more",
                status = "Running",
                endpoints = new
                {
                    equipment = "/api/equipment",
                    products = "/api/products",
                    services = "/api/services",
                    employees = "/api/employees",
                    references = "/api/references",
                    aboutLogos = "/api/aboutlogos",
                    auth = "/api/auth",
                    upload = "/api/upload",
                    contact = "/api/contact",
                    visitorAnalytics = "/api/visitor-analytics"
                },
                documentation = "/swagger",
                timestamp = DateTime.UtcNow
            };

            return Ok(apiInfo);
        }

        [HttpGet("health")]
        public IActionResult HealthCheck()
        {
            return Ok(new { status = "Healthy", timestamp = DateTime.UtcNow });
        }
    }
}
