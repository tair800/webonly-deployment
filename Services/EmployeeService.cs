using Microsoft.EntityFrameworkCore;
using WebOnlyAPI.Data;
using WebOnlyAPI.DTOs;
using WebOnlyAPI.Models;

namespace WebOnlyAPI.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly ApplicationDbContext _context;

        public EmployeeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EmployeeResponseDto>> GetAllEmployeesAsync()
        {
            var employees = await _context.Employees
                .OrderBy(e => e.CreatedAt)
                .ToListAsync();

            return employees.Select(MapToResponseDto);
        }

        public async Task<EmployeeResponseDto?> GetEmployeeByIdAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            return employee != null ? MapToResponseDto(employee) : null;
        }

        public async Task<EmployeeResponseDto> CreateEmployeeAsync(CreateEmployeeDto createDto)
        {
            var employee = new Employee
            {
                Name = createDto.Name,
                Position = createDto.Position,
                Description = createDto.Description,
                Phone = createDto.Phone,
                Email = createDto.Email,
                LinkedIn = createDto.LinkedIn,
                ImageUrl = createDto.ImageUrl,
                CreatedAt = DateTime.UtcNow
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return MapToResponseDto(employee);
        }

        public async Task<EmployeeResponseDto?> UpdateEmployeeAsync(int id, UpdateEmployeeDto updateDto)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
                return null;

            employee.Name = updateDto.Name;
            employee.Position = updateDto.Position;
            employee.Description = updateDto.Description;
            employee.Phone = updateDto.Phone;
            employee.Email = updateDto.Email;
            employee.LinkedIn = updateDto.LinkedIn;
            employee.ImageUrl = updateDto.ImageUrl;
            employee.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return MapToResponseDto(employee);
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
                return false;

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return true;
        }

        private static EmployeeResponseDto MapToResponseDto(Employee employee)
        {
            return new EmployeeResponseDto
            {
                Id = employee.Id,
                Name = employee.Name,
                Position = employee.Position,
                Description = employee.Description,
                Phone = employee.Phone,
                Email = employee.Email,
                LinkedIn = employee.LinkedIn,
                ImageUrl = employee.ImageUrl,
                CreatedAt = employee.CreatedAt,
                UpdatedAt = employee.UpdatedAt
            };
        }
    }
}
