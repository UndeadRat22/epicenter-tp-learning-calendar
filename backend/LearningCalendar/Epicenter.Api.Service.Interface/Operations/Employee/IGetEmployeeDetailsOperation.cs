using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Employee
{
    public interface IGetEmployeeDetailsOperation
    {
        Task<GetEmployeeDetailsOperationResponse> Execute();
    }

    public class GetEmployeeDetailsOperationResponse
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageData { get; set; }
        public string Email { get; set; }
        public bool IsTopLevelManager { get; set; }
    }
}