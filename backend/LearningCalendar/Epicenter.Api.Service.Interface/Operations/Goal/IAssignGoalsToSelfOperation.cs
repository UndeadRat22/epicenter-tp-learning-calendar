using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Goal
{
    public interface IAssignGoalsToSelfOperation
    {
        Task Execute(AssignGoalToSelfOperationRequest request);
    }

    public class AssignGoalToSelfOperationRequest
    {
        public List<Guid> TopicIds { get; set; }
    }
}