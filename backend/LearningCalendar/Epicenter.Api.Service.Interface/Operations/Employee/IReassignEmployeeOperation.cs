using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Employee
{
    public interface IReassignEmployeeOperation
    {
        Task Execute(ReassignEmployeeOperationRequest request);
    }

    public class ReassignEmployeeOperationRequest
    {
        public Guid EmployeeId { get; set; }
        public Guid ManagerId { get; set; }
    }
}