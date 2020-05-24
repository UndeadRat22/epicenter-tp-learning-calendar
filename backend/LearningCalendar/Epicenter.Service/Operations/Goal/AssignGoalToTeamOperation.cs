using System;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Goal;

namespace Epicenter.Service.Operations.Goal
{
    public class AssignGoalToTeamOperation : Operation, IAssignGoalToTeamOperation
    {
        private readonly IAssignGoalToEmployeeOperation _assignGoalToEmployeeOperation;
        private readonly IAuthorizationContext _authorizationContext;

        public AssignGoalToTeamOperation(
            IAssignGoalToEmployeeOperation assignGoalToEmployeeOperation, 
            IAuthorizationContext authorizationContext)
        {
            _assignGoalToEmployeeOperation = assignGoalToEmployeeOperation;
            _authorizationContext = authorizationContext;
        }

        public async Task Execute(AssignGoalToTeamOperationRequest request)
        {
            var team = (await _authorizationContext.CurrentEmployee())
                .ManagedTeam;

            foreach (var employee in team.Employees)
            {
                var assignToEmployeeRequest = new AssignGoalsToEmployeeOperationRequest
                {
                    EmployeeId = employee.Id,
                    TopicIds = request.TopicIds
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
        }
    }
}