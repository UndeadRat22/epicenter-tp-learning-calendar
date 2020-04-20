using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Goal
{
    public interface IAssignGoalToTeamOperation
    {
        Task<AssignGoalToTeamOperationResponse> Execute(AssignGoalToTeamOperationRequest request);
    }

    public class AssignGoalToTeamOperationRequest
    {
        public Guid ManagerId { get; set; }
        public Guid TopicId { get; set; }
    }

    public class AssignGoalToTeamOperationResponse
    {

    }
}