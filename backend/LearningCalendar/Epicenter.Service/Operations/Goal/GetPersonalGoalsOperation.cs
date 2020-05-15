using Epicenter.Service.Interface.Operations.Goal;
using System.Threading.Tasks;
using Epicenter.Service.Context.Interface.Authorization;

namespace Epicenter.Service.Operations.Goal
{
    public class GetPersonalGoalsOperation : Operation, IGetPersonalGoalsOperation
    {
        private readonly IAuthorizationContext _authorizationContext;
        private readonly IGetEmployeeGoalsOperation _getEmployeeGoalsOperation;

        public GetPersonalGoalsOperation(IAuthorizationContext authorizationContext, IGetEmployeeGoalsOperation employeeGoalsOperation)
        {
            _authorizationContext = authorizationContext;
            _getEmployeeGoalsOperation = employeeGoalsOperation;
        }

        public async Task<GetEmployeeGoalsOperationResponse> Execute()
        {
            var employee = await _authorizationContext.CurrentEmployee();
            
            return await _getEmployeeGoalsOperation.Execute(new GetEmployeeGoalsOperationRequest {EmployeeId = employee.Id});
        }
    }
}