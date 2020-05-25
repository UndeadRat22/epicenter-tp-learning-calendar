using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Goal
{
    public interface IAssignGoalToEmployeeOperation
    {
        Task Execute(AssignGoalsToEmployeeOperationRequest request);
    }

    public class AssignGoalsToEmployeeOperationRequest
    {
        public Guid EmployeeId { get; set; }
        public List<Guid> TopicIds { get; set; }
    }
}