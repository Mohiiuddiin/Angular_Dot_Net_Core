using BackEnd_Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using BackEnd_Api.Services;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;

namespace BackEnd_Api.Controllers
{
    public class UserAccController : Controller
    {
        private readonly Learn_DBContext _context;
        private readonly JWTSetting _setting;
        private readonly IRefreshTokenGenerator _refreshTokenGenerator;
        public UserAccController(Learn_DBContext dataContext, IOptions<JWTSetting> options, IRefreshTokenGenerator refreshTokenGenerator)
        {
            _context = dataContext;
            _setting = options.Value;
            _refreshTokenGenerator = refreshTokenGenerator;
        }

        public TokenResponse Authenticate(string userName, Claim[] claim)
        {
            TokenResponse tokenResponse = new TokenResponse();
            var tokenKey = Encoding.UTF8.GetBytes(_setting.SecurityKey);
            var tokenhandler = new JwtSecurityToken(
                    claims: claim,
                    expires: DateTime.Now.AddMinutes(2),
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256)
                );
            tokenResponse.JWTToken = new JwtSecurityTokenHandler().WriteToken(tokenhandler);
            tokenResponse.RefreshToken = _refreshTokenGenerator.GenerateRefreshToken(userName);

            return tokenResponse;
            //return Ok();
        }

        [Route("authenticate")]
        [HttpPost]
        public IActionResult Authenticate([FromBody] Login login, string UserName)
        {
            TokenResponse tokenResponse = new TokenResponse();
            var _user = _context.TblUsers.FirstOrDefault(o => o.Userid == login.UserName && o.Password == login.Password && o.IsActive == true);
            if (_user == null)
                return Unauthorized();

            var tokenhandler = new JwtSecurityTokenHandler();
            var tokenkey = Encoding.UTF8.GetBytes(_setting.SecurityKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.Name, _user.Userid),
                        new Claim(ClaimTypes.Role, _user.Role)
                    }
                ),
                Expires = DateTime.Now.AddMinutes(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenkey), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenhandler.CreateToken(tokenDescriptor);
            string finaltoken = tokenhandler.WriteToken(token);

            tokenResponse.JWTToken = finaltoken;
            tokenResponse.RefreshToken = _refreshTokenGenerator.GenerateRefreshToken(login.UserName);
            return Ok(tokenResponse);
        }

        [Route("Refresh")]
        [HttpPost]
        public IActionResult Refresh([FromBody] TokenResponse token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principle = tokenHandler.ValidateToken(token.JWTToken, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_setting.SecurityKey)),
                ValidateIssuer = false,
                ValidateAudience = false
            }, out securityToken);
            var _token = securityToken as JwtSecurityToken;
            if (_token != null && !_token.Header.Alg.Equals(SecurityAlgorithms.HmacSha256))
            {
                return Unauthorized();
            }

            var userName = principle.Identity.Name;
            var reftbl = _context.TblRefreshtokens.FirstOrDefault(x => x.UserId == userName && x.RefreshToken == token.RefreshToken);
            if (reftbl == null)
            {
                return Unauthorized();
            }

            TokenResponse res = Authenticate(userName, principle.Claims.ToArray());
            return Ok(res);
        }
    }
}
