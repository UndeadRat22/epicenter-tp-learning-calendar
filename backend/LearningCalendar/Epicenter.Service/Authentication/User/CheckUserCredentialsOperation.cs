using System.Linq;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Cryptography;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Service.Interface.Authentication.User;
using Microsoft.AspNetCore.Identity;

namespace Epicenter.Service.Authentication.User
{
    public class CheckUserCredentialsOperation : ICheckUserCredentialsOperation
    {
        private readonly IRepository<IdentityUser> _userRepository;

        public CheckUserCredentialsOperation(IRepository<IdentityUser> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<CheckUserCredentialsOperationResponse> Execute(CheckUserCredentialsOperationRequest request)
        {
            string passwordHash = Sha256Hash.Calculate(request.Password);

            var queryResult = await _userRepository.QuerySingleAsync(user => user.Email == request.Email && user.PasswordHash == passwordHash);

            return new CheckUserCredentialsOperationResponse
            {
                IsCorrect = queryResult != null
            };
        }
    }
}