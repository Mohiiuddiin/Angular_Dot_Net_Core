namespace BackEnd_Api.Services
{
    public interface IRefreshTokenGenerator
    {
        string GenerateRefreshToken(string username);
    }
}
