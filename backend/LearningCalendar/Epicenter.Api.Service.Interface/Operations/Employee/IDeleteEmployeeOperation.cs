using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Employee
{
    public interface IDeleteEmployeeOperation
    {
        Task Execute(DeleteEmployeeOperationRequest request);
    }

    public class DeleteEmployeeOperationRequest
    {
        public Guid EmployeeId { get; set; }
    }
}