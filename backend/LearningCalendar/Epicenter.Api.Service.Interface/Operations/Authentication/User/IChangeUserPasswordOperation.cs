using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Authentication.User
{
    public interface IChangeUserPasswordOperation
    {
        Task Execute(ChangeUserPasswordOperationRequest request);
    }

    public class ChangeUserPasswordOperationRequest
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}