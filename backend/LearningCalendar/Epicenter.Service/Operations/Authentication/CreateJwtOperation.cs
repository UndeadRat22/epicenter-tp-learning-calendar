using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Settings;
using Epicenter.Service.Interface.Operations.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Epicenter.Service.Operations.Authentication
{
    public class CreateJwtOperation : Operation, ICreateJwtOperation
    {
        private readonly JwtSettings _jwtSettings;

        public CreateJwtOperation(
            IOptions<JwtSettings> jwtSettings)
        {
            _jwtSettings = jwtSettings.Value;
        }

        public JwtResponse Execute(CreateJwtOperationRequest request)
        {
            var claims = new[] { new Claim(ClaimTypes.Name, request.Email) };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expires = DateTime.Now.AddMinutes(_jwtSettings.AccessExpiration);

            var jwtToken = new JwtSecurityToken(_jwtSettings.Issuer, _jwtSettings.Audience, claims, expires: expires,
                signingCredentials: credentials);

            string token = new JwtSecurityTokenHandler().WriteToken(jwtToken);


            var result = new JwtResponse
            {
                Expires = expires,
                Token = token
            };

            return result;
        }
    }
}