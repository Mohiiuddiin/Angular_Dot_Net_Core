using BackEnd_Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DataContext _context;
        public EmployeeController(DataContext dataContext)
        {
            _context = dataContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            List<Employee> employee = new List<Employee>();
            employee = await _context.Employees.Include(x=>x.Department).ToListAsync();
            return Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Employee employee)
        {
            employee.Id = Guid.NewGuid();

            var dept = await _context.Departments.Where(x => x.Id == employee.DepartmentId).FirstAsync();
            employee.DepartmentName = dept.Name; await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return Ok(employee);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(x => x.Id == id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, Employee employeeToUpdate)
        {
            var employee = await _context.Employees.FindAsync(id);



            if (employee == null)
            {
                return NotFound();
            }
            employee.Name = employeeToUpdate.Name;
            employee.Email = employeeToUpdate.Email;
            employee.Phone = employeeToUpdate.Phone;
            employee.Salary = employeeToUpdate.Salary;
            employee.DepartmentId = employeeToUpdate.DepartmentId;
            var dept = await _context.Departments.Where(x => x.Id == employeeToUpdate.DepartmentId).FirstAsync();
            employee.DepartmentName = dept.Name;


            await _context.SaveChangesAsync();


            return Ok(employee);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok(employee);
        }

        //public async Task<IActionResult> Delete()
        //{
        //    return Ok(await _context.Employees.ToListAsync());
        //}
    }
}
