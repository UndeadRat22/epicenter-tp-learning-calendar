using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Settings;
using Epicenter.Service.Interface.Authentication;
using Epicenter.Service.Interface.Authentication.User;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Epicenter.Service.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUserService _userService;
        private readonly JwtSettings _jwtSettings;

        public AuthenticationService(IUserService userService, IOptions<JwtSettings> options)
        {
            _userService = userService;
            _jwtSettings = options.Value;
        }


        public async Task<AuthenticationResultDto> Authenticate(string email, string password)
        {
            var exists = await _userService.Exists(email, password);

            if (!exists)
            {
                return new AuthenticationResultDto
                {
                    IsAuthenticated = false
                };
            }

            var claims = new [] { new Claim(ClaimTypes.Name, email) };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expires = DateTime.Now.AddMinutes(_jwtSettings.AccessExpiration);

            var jwtToken = new JwtSecurityToken(_jwtSettings.Issuer, _jwtSettings.Audience, claims, expires: expires, signingCredentials: credentials);

            string token = new JwtSecurityTokenHandler().WriteToken(jwtToken);

            return new AuthenticationResultDto
            {
                IsAuthenticated = true,
                Token = token
            };

        }


        public async Task<RegistrationResultDto> CreateAuthIdentity(string email)
        {
            var exists = await _userService.Exists(email);
            if (exists)
            {
                return new RegistrationResultDto
                {
                    IsSuccessful = false
                };
            }

            var user = await _userService.Create(email, "password1");

            return new RegistrationResultDto
            {
                IsSuccessful = true
            };
        }
    }
}