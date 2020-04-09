using System.Linq;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Cryptography;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Service.Interface.Authentication.User;

namespace Epicenter.Service.Authentication.User
{
    public class UserService : IUserService
    {
        private readonly IRepository<Domain.Entity.Authentication.User> _userRepository;

        public UserService(IRepository<Domain.Entity.Authentication.User> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> Exists(string email, string password)
        {
            string passwordHash = Sha256Hash.Calculate(password);

            var queryResult = await _userRepository.QueryAsync(user => user.Email == email && user.Password == passwordHash);

            bool exits = queryResult.SingleOrDefault() != null;

            return exits;
        }

        public async Task<bool> Exists(string email)
        {
            var queryResult = await _userRepository.QueryAsync(user => user.Email == email);

            bool exits = queryResult.SingleOrDefault() != null;

            return exits;
        }

        public async Task<UserDto> Create(string email, string password)
        {
            string passwordHash = Sha256Hash.Calculate(password);

            var userEntity = new Domain.Entity.Authentication.User
            {
                Email = email,
                Password = passwordHash
            };

            await _userRepository.CreateAsync(userEntity);

            return new UserDto
            {
                Id = userEntity.Id,
                Email = userEntity.Email
            };
        }
    }
}