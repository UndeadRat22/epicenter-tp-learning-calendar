using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Service.Interface.Operations.Authentication.User;
using Microsoft.AspNetCore.Identity;

namespace Epicenter.Service.Operations.Authentication.User
{
    public class UserExistsOperation : IUserExistsOperation
    {
        private readonly IRepository<IdentityUser> _identityRepository;

        public UserExistsOperation(IRepository<IdentityUser> identityRepository)
        {
            _identityRepository = identityRepository;
        }

        public async Task<bool> Execute(string email)
        {
            var queryResult = await _identityRepository.QuerySingleAsync(user => user.Email == email);

            return queryResult != null;
        }
    }
}