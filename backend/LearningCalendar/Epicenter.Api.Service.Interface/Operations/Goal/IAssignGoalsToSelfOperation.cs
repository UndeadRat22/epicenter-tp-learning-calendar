using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Goal
{
    public interface IAssignGoalsToSelfOperation
    {
        Task Execute(AssignGoalsAssignGoalToSelfOperationRequest request);
    }

    public class AssignGoalsAssignGoalToSelfOperationRequest
    {
        public List<Guid> TopicIds { get; set; }
    }
}