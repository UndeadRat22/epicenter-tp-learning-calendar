using System;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.Goal;

namespace Epicenter.Service.Operations.Goal
{
    public class AssignGoalToTeamOperation : IAssignGoalToTeamOperation
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IAssignGoalToEmployeeOperation _assignGoalToEmployeeOperation;

        public AssignGoalToTeamOperation(ITeamRepository teamRepository, IAssignGoalToEmployeeOperation assignGoalToEmployeeOperation)
        {
            _teamRepository = teamRepository;
            _assignGoalToEmployeeOperation = assignGoalToEmployeeOperation;
        }

        public async Task<AssignGoalToTeamOperationResponse> Execute(AssignGoalToTeamOperationRequest request)
        {
            var team = await _teamRepository.GetByManagerIdAsync(request.ManagerId);

            foreach (var employee in team.Employees)
            {
                var assignToEmployeeRequest = new AssignGoalToEmployeeOperationRequest
                {
                    EmployeeId = employee.Id,
                    TopicId = request.TopicId
                };
                try
                {
                    await _assignGoalToEmployeeOperation.Execute(assignToEmployeeRequest);
                }
                catch (ApplicationException)
                {
                    //swallow
                }
            }
            return new AssignGoalToTeamOperationResponse();
        }
    }
}