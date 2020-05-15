using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Authentication;

namespace Epicenter.Service.Operations.Authentication
{
    public class RefreshJwtOperation : Operation, IRefreshJwtOperation
    {
        private readonly ICreateJwtOperation _createJwtOperation;
        private readonly IAuthorizationContext _authorizationContext;

        public RefreshJwtOperation(ICreateJwtOperation jwtOperation, IAuthorizationContext authorizationContext)
        {
            _createJwtOperation = jwtOperation;
            _authorizationContext = authorizationContext;
        }

        public JwtResponse Execute()
        {
            var email = _authorizationContext.IdentityName;
            var request = new CreateJwtOperationRequest
            {
                Email = email
            };

            return _createJwtOperation.Execute(request);
        }
    }
}