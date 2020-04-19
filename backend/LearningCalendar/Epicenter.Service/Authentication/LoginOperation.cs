using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Settings;
using Epicenter.Service.Authentication.User;
using Epicenter.Service.Interface.Authentication;
using Epicenter.Service.Interface.Authentication.User;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Epicenter.Service.Authentication
{
    public class LoginOperation : ILoginOperation
    {
        private readonly ICheckUserCredentialsOperation _checkUserCredentialsOperation;
        private readonly JwtSettings _jwtSettings;

        public LoginOperation(
            ICheckUserCredentialsOperation checkUserCredentialsOperation,
            IOptions<JwtSettings> jwtSettings)
        {
            _checkUserCredentialsOperation = checkUserCredentialsOperation;
            _jwtSettings = jwtSettings.Value;
        }


        public async Task<LoginOperationResponse> Execute(LoginOperationRequest request)
        {
            var checkResponse = await _checkUserCredentialsOperation.Execute(new CheckUserCredentialsOperationRequest
                { Email = request.Email, Password = request.Password });

            if (!checkResponse.IsCorrect)
            {
                return new LoginOperationResponse
                {
                    IsAuthenticated = false
                };
            }

            var claims = new[] { new Claim(ClaimTypes.Name, request.Email) };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expires = DateTime.Now.AddMinutes(_jwtSettings.AccessExpiration);

            var jwtToken = new JwtSecurityToken(_jwtSettings.Issuer, _jwtSettings.Audience, claims, expires: expires,
                signingCredentials: credentials);

            string token = new JwtSecurityTokenHandler().WriteToken(jwtToken);

            return new LoginOperationResponse
            {
                IsAuthenticated = true,
                Token = token
            };
        }
    }
}