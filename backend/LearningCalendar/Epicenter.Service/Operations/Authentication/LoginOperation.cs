using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Settings;
using Epicenter.Service.Interface.Operations.Authentication;
using Epicenter.Service.Interface.Operations.Authentication.User;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Epicenter.Service.Operations.Authentication
{
    public class LoginOperation : ILoginOperation
    {
        private readonly ICheckUserCredentialsOperation _checkUserCredentialsOperation;
        private readonly ICreateJwtOperation _createJwtOperation;

        public LoginOperation(ICheckUserCredentialsOperation checkUserCredentialsOperation, ICreateJwtOperation jwtOperation)
        {
            _checkUserCredentialsOperation = checkUserCredentialsOperation;
            _createJwtOperation = jwtOperation;
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

            var jwtRequest = new CreateJwtOperationRequest
            {
                Email = request.Email
            };
            var jwtResponse = _createJwtOperation.Execute(jwtRequest);


            return new LoginOperationResponse
            {
                IsAuthenticated = true,
                Token = jwtResponse.Token,
                Expires = jwtResponse.Expires
            };
        }
    }
}