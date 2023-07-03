using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hospital.Data;
using Hospital.Models;

namespace Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecializationsController : ControllerBase
    {
        private readonly HsptlContext _context;

        public SpecializationsController(HsptlContext context)
        {
            _context = context;
        }

        // GET: api/Specializations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Specialization>>> GetSpecialization()
        {
          if (_context.Specialization == null)
          {
              return NotFound();
          }
            return await _context.Specialization.ToListAsync();
        }

        // GET: api/Specializations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Specialization>> GetSpecialization(string id)
        {
          if (_context.Specialization == null)
          {
              return NotFound();
          }
            var specialization = await _context.Specialization.FindAsync(id);

            if (specialization == null)
            {
                return NotFound();
            }

            return specialization;
        }

        // PUT: api/Specializations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSpecialization(string id, Specialization specialization)
        {
            if (id != specialization.Specialization_name)
            {
                return BadRequest();
            }

            _context.Entry(specialization).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SpecializationExists(id))
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

        // POST: api/Specializations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Specialization>> PostSpecialization(Specialization specialization)
        {
          if (_context.Specialization == null)
          {
              return Problem("Entity set 'HsptlContext.Specialization'  is null.");
          }
            _context.Specialization.Add(specialization);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SpecializationExists(specialization.Specialization_name))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSpecialization", new { id = specialization.Specialization_name }, specialization);
        }

        // DELETE: api/Specializations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpecialization(string id)
        {
            if (_context.Specialization == null)
            {
                return NotFound();
            }
            var specialization = await _context.Specialization.FindAsync(id);
            if (specialization == null)
            {
                return NotFound();
            }

            _context.Specialization.Remove(specialization);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SpecializationExists(string id)
        {
            return (_context.Specialization?.Any(e => e.Specialization_name == id)).GetValueOrDefault();
        }
    }
}
