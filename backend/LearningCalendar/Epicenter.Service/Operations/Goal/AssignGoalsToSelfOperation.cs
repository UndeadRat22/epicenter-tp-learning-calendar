using System.Threading.Tasks;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Goal;

namespace Epicenter.Service.Operations.Goal
{
    public class AssignGoalsToSelfOperation : Operation, IAssignGoalsToSelfOperation
    {
        private readonly IAuthorizationContext _authorizationContext;
        private readonly IAssignGoalToEmployeeOperation _assignGoalToEmployeeOperation;

        public AssignGoalsToSelfOperation(
            IAuthorizationContext authorizationContext, 
            IAssignGoalToEmployeeOperation assignGoalToEmployeeOperation)
        {
            _authorizationContext = authorizationContext;
            _assignGoalToEmployeeOperation = assignGoalToEmployeeOperation;
        }
        public async Task Execute(AssignGoalToSelfOperationRequest request)
        {
            var employee = await _authorizationContext.CurrentEmployee();
            var assignGoalRequest = new AssignGoalsToEmployeeOperationRequest
            {
                EmployeeId = employee.Id,
                TopicIds = request.TopicIds
            };
            await _assignGoalToEmployeeOperation.Execute(assignGoalRequest);
        }
    }
}