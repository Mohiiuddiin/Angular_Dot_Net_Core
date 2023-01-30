using BackEnd_Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly DataContext _context;
        public ProductController(DataContext dataContext)
        {
            _context = dataContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<Product> products = new List<Product>();
            products = await _context.Products.ToListAsync();
            return Ok(products);
        }

        [HttpGet]
        // [Route("{code:string}")]
        [Route("GetByCode/{code}")]
        public async Task<IActionResult> GetByCode([FromRoute] string code)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Code == code);

            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
    }
}
