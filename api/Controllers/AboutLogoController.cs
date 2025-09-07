using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebOnlyAPI.Data;
using WebOnlyAPI.Models;

namespace WebOnlyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AboutLogoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AboutLogoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/AboutLogo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AboutLogo>>> GetAboutLogos()
        {
            return await _context.AboutLogos.ToListAsync();
        }

        // GET: api/AboutLogo/1
        [HttpGet("{id}")]
        public async Task<ActionResult<AboutLogo>> GetAboutLogo(int id)
        {
            var aboutLogo = await _context.AboutLogos.FindAsync(id);

            if (aboutLogo == null)
            {
                return NotFound();
            }

            return aboutLogo;
        }

        // POST: api/AboutLogo
        [HttpPost]
        public async Task<ActionResult<AboutLogo>> PostAboutLogo(AboutLogo aboutLogo)
        {
            aboutLogo.CreatedAt = DateTime.UtcNow;
            _context.AboutLogos.Add(aboutLogo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAboutLogo), new { id = aboutLogo.Id }, aboutLogo);
        }

        // PUT: api/AboutLogo/1
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAboutLogo(int id, AboutLogo aboutLogo)
        {
            if (id != aboutLogo.Id)
            {
                return BadRequest();
            }

            aboutLogo.UpdatedAt = DateTime.UtcNow;
            _context.Entry(aboutLogo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AboutLogoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/AboutLogo/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAboutLogo(int id)
        {
            var aboutLogo = await _context.AboutLogos.FindAsync(id);
            if (aboutLogo == null)
            {
                return NotFound();
            }

            _context.AboutLogos.Remove(aboutLogo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AboutLogoExists(int id)
        {
            return _context.AboutLogos.Any(e => e.Id == id);
        }
    }
}
