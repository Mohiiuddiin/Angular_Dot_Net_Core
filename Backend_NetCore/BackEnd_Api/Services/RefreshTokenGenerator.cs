using BackEnd_Api.Models;
using System.Security.Cryptography;

namespace BackEnd_Api.Services
{
    public class RefreshTokenGenerator : IRefreshTokenGenerator
    {
        private Learn_DBContext _context;
        public RefreshTokenGenerator(Learn_DBContext context)
        {
            _context = context;
        }
        public string GenerateRefreshToken(string username)
        {
            var randomnumber = new byte[32];
            using (var randomnumbergenerator = RandomNumberGenerator.Create())
            {
                randomnumbergenerator.GetBytes(randomnumber);
                string RefreshToken = Convert.ToBase64String(randomnumber);

                var _user = _context.TblRefreshtokens.FirstOrDefault(o => o.UserId == username);
                if (_user != null)
                {
                    _user.RefreshToken = RefreshToken;
                    _context.SaveChanges();
                }
                else
                {
                    TblRefreshtoken tblRefreshtoken = new TblRefreshtoken()
                    {
                        UserId = username,
                        TokenId = new Random().Next().ToString(),
                        RefreshToken = RefreshToken,
                        IsActive = true
                    };
                }

                return RefreshToken;
            }
        }
    }
}
