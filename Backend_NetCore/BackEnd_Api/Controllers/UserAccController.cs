using BackEnd_Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace BackEnd_Api.Controllers
{
    public class UserAccController : Controller
    {
        private readonly Learn_DBContext _context;
        private readonly JWTSetting _setting;
        public UserAccController(Learn_DBContext dataContext)
        {
            _context = dataContext;
        }

        
        //[HttpGet]
        //public async IActionResult Authenticate()
        //{
        //    return Ok();
        //}

        [Route("authenticate")]
        [HttpPost]
        public IActionResult Authenticate([FromBody] Login login)
        {
            return Ok();
        }
    }
}
