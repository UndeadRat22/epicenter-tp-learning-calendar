using System;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Cryptography;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Service.Interface.Authentication.User;
using Epicenter.Service.Interface.Exceptions.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Epicenter.Service.Authentication.User
{
    public class UserService : IUserService
    {
        private readonly IRepository<IdentityUser> _userRepository;

        public UserService(IRepository<IdentityUser> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> ExistsAsync(string email, string password)
        {
            string passwordHash = Sha256Hash.Calculate(password);

            var queryResult = await _userRepository.QueryAsync(user => user.Email == email && user.PasswordHash == passwordHash);

            bool exits = queryResult.SingleOrDefault() != null;

            return exits;
        }

        public async Task<bool> ExistsAsync(string email)
        {
            var queryResult = await _userRepository.QueryAsync(user => user.Email == email);

            bool exits = queryResult.SingleOrDefault() != null;

            return exits;
        }

        public async Task<UserDto> CreateAsync(string email, string password)
        {
            string passwordHash = Sha256Hash.Calculate(password);

            var userEntity = new IdentityUser
            {
                Email = email,
                PasswordHash = passwordHash
            };

            try
            {
                await _userRepository.CreateAsync(userEntity);
            }
            catch (DbUpdateException)
            {
                throw new EmailAlreadyUseException();
            }

            return new UserDto
            {
                Id = userEntity.Id,
                Email = userEntity.Email
            };
        }
    }
}