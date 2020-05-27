using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic.Employee
{

    public interface IGetEmployeeTopicTreeOperation
    {
        Task<GetEmployeeTopicTreeOperationResponse> Execute(GetEmployeeTopicTreeOperationRequest request);
    }

    public class GetEmployeeTopicTreeOperationRequest
    {
        public Guid EmployeeId { get; set; }
    }
}