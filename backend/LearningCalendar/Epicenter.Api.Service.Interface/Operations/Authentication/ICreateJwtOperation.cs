using System;

namespace Epicenter.Service.Interface.Operations.Authentication
{
    public interface ICreateJwtOperation
    {
        CreateJwtOperationResponse Execute(CreateJwtOperationRequest request);
    }

    public class CreateJwtOperationRequest
    {
        public string Email { get; set; }
    }

    public class CreateJwtOperationResponse
    {
        public string Token { get; set; }
        public DateTime Expires { get; set; }
    }
}