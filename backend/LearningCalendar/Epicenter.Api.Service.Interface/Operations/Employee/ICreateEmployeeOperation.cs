using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Employee
{
    public interface ICreateEmployeeOperation
    {
        Task<CreateEmployeeOperationResponse> Execute(CreateEmployeeOperationRequest request);
    }

    public class CreateEmployeeOperationRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ManagerEmail { get; set; }
    }

    public class CreateEmployeeOperationResponse
    {

    }
}