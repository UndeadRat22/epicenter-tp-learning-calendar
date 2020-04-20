using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Goal
{
    public interface IAssignGoalToEmployeeOperation
    {
        Task<AssignGoalToEmployeeOperationResponse> Execute(AssignGoalToEmployeeOperationRequest request);
    }

    public class AssignGoalToEmployeeOperationRequest
    {
        public Guid EmployeeId { get; set; }
        public Guid TopicId { get; set; }
    }

    public class AssignGoalToEmployeeOperationResponse
    {

    }
}