namespace Epicenter.Service.Interface.Authentication
{
    public class AuthenticationResultDto
    {
        public bool IsAuthenticated { get; set; }
        public string Token { get; set; }
    }
}