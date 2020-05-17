using System.Threading.Tasks;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Goal;

namespace Epicenter.Service.Operations.Goal
{
    public class AssignGoalToSelfOperation : IAssignGoalToSelfOperation
    {
        private readonly IAuthorizationContext _authorizationContext;
        private readonly IAssignGoalToEmployeeOperation _assignGoalToEmployeeOperation;

        public AssignGoalToSelfOperation(
            IAuthorizationContext authorizationContext, 
            IAssignGoalToEmployeeOperation assignGoalToEmployeeOperation)
        {
            _authorizationContext = authorizationContext;
            _assignGoalToEmployeeOperation = assignGoalToEmployeeOperation;
        }
        public async Task Execute(AssignGoalToSelfOperationRequest request)
        {
            var employee = await _authorizationContext.CurrentEmployee();
            var assignGoalRequest = new AssignGoalToEmployeeOperationRequest
            {
                EmployeeId = employee.Id,
                TopicId = request.TopicId
            };
            await _assignGoalToEmployeeOperation.Execute(assignGoalRequest);
        }
    }
}