using BackEnd_Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : Controller
    {
        private readonly DataContext _context;
        public CustomerController(DataContext dataContext)
        {
            _context = dataContext;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<Customer> customers = new List<Customer>();
            customers = await _context.Customers.ToListAsync();
            return Ok(customers);
        }

        [HttpGet]
        //[Route("{code:string}")]
        [Route("GetByCode/{code}")]
        public async Task<IActionResult> GetByCode([FromRoute] string code)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(x => x.Code == code);

            if (customer == null)
            {
                return NotFound();
            }
            return Ok(customer);
        }
    }
}
