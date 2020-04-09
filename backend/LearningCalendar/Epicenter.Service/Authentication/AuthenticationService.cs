using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Cryptography;
using Epicenter.Infrastructure.Settings;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Service.Interface.Authentication;
using Epicenter.Service.Interface.Authentication.User;
using Epicenter.Service.Interface.Mail;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Epicenter.Service.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IRepository<Domain.Entity.Authentication.Invite> _inviteRepository; 
        private readonly IUserService _userService;
        private readonly JwtSettings _jwtSettings;

        public AuthenticationService(
            IRepository<Domain.Entity.Authentication.Invite> inviteRepository,
            IUserService userService,
            IOptions<JwtSettings> jwtOptions)
        {
            _inviteRepository = inviteRepository;
            _userService = userService;
            _jwtSettings = jwtOptions.Value;
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


        public async Task<RegistrationResultDto> Register(string invitationId, string password)
        {
            var guid = Guid.Parse(invitationId);
            var existingInvitation = await _inviteRepository.QuerySingleAsync(invitation => invitation.Id == guid);

            if (existingInvitation == null)
            {
                return new RegistrationResultDto
                {
                    IsSuccessful = false
                };
            }

            var createTask = _userService.Create(existingInvitation.InvitationTo, password);
            await _inviteRepository.DeleteAsync(existingInvitation);
            await createTask;

            return new RegistrationResultDto
            {
                IsSuccessful = true
            };
        }
    }
}