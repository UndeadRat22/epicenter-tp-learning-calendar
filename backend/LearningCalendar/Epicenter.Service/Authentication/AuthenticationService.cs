using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Cryptography;
using Epicenter.Infrastructure.Settings;
using Epicenter.Persistence.Interface.Repository.Authentication;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Service.Interface.Authentication;
using Epicenter.Service.Interface.Authentication.User;
using Epicenter.Service.Interface.Employee;
using Epicenter.Service.Interface.Mail;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Epicenter.Service.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IInvitationRepository _invitationRepository;
        private readonly IRepository<IdentityUser> _identityRepository;
        private readonly IUserService _userService;
        private readonly IEmployeeService _employeeService;
        private readonly JwtSettings _jwtSettings;

        public AuthenticationService(
            IInvitationRepository invitationRepository, 
            IRepository<IdentityUser> identityRepository, 
            IUserService userService, 
            IEmployeeService employeeService, 
            IOptions<JwtSettings> jwtSettings)
        {
            _invitationRepository = invitationRepository;
            _identityRepository = identityRepository;
            _userService = userService;
            _employeeService = employeeService;
            _jwtSettings = jwtSettings.Value;
        }


        public async Task<AuthenticationResultDto> AuthenticateAsync(string email, string password)
        {
            var exists = await _userService.ExistsAsync(email, password);

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


        public async Task<RegistrationResultDto> RegisterAsync(string invitationId, string password)
        {
            var invitationGuid = Guid.Parse(invitationId);
            var existingInvitation = await _invitationRepository.GetWithInviterAsync(invitationGuid);
            if (existingInvitation == null)
            {
                return new RegistrationResultDto
                {
                    IsSuccessful = false
                };
            }
            var newUser = await _userService.CreateAsync(existingInvitation.InvitationTo, password);

            await _employeeService.CreateAsync(newUser.Id, existingInvitation.InvitationFrom.Email);
            await _invitationRepository.DeleteAsync(existingInvitation);

            return new RegistrationResultDto
            {
                IsSuccessful = true
            };
        }
    }
}