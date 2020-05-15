using System.Threading.Tasks;
using Epicenter.Infrastructure.Cryptography;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Exceptions.Authentication;
using Epicenter.Service.Interface.Operations.Authentication.User;
using Microsoft.AspNetCore.Identity;

namespace Epicenter.Service.Operations.Authentication.User
{
    public class ChangeUserPasswordOperation : Operation, IChangeUserPasswordOperation
    {
        private readonly IRepository<IdentityUser> _userRepository;
        private readonly IAuthorizationContext _authorizationContext;

        public ChangeUserPasswordOperation(IRepository<IdentityUser> userRepository, IAuthorizationContext authorizationContext)
        {
            _userRepository = userRepository;
            _authorizationContext = authorizationContext;
        }

        public async Task Execute(ChangeUserPasswordOperationRequest request)
        {
            Task<IdentityUser> identityTask = _authorizationContext.CurrentIdentity();

            string oldPasswordHash = Sha256Hash.Calculate(request.OldPassword);
            string newPasswordHash = Sha256Hash.Calculate(request.NewPassword);

            IdentityUser identity = await identityTask;

            if (identity.PasswordHash == oldPasswordHash)
            {
                identity.PasswordHash = newPasswordHash;
                await _userRepository.UpdateAsync(identity);
            }
            else
            {
                throw new WrongPasswordException();
            }
        }
    }
}
