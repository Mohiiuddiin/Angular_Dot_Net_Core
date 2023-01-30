using BackEnd_Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : Controller
    {
        private readonly DataContext _context;
        public DepartmentController(DataContext dataContext)
        {
            _context = dataContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<Department> departments = new List<Department>();
            departments = await _context.Departments.ToListAsync();
            return Ok(departments);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Department department)
        {
            department.Id = Guid.NewGuid();
            await _context.Departments.AddAsync(department);
            await _context.SaveChangesAsync();
            return Ok(department);
        }
    }
}
