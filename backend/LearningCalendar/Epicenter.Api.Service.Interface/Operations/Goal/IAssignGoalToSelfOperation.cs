using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Goal
{
    public interface IAssignGoalToSelfOperation
    {
        Task Execute(AssignGoalToSelfOperationRequest request);
    }

    public class AssignGoalToSelfOperationRequest
    {
        public Guid TopicId { get; set; }
    }
}