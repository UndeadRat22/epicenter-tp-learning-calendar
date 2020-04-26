using System;

namespace Epicenter.Service.Interface.Operations.Authentication
{
    public interface ICreateJwtOperation
    {
        JwtResponse Execute(CreateJwtOperationRequest request);
    }

    public class CreateJwtOperationRequest
    {
        public string Email { get; set; }
    }

    public class JwtResponse
    {
        public string Token { get; set; }
        public DateTime Expires { get; set; }
    }
}