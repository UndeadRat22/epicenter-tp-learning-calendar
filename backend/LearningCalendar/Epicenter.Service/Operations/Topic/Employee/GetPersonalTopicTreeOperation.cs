using System.Threading.Tasks;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Topic.Employee;

namespace Epicenter.Service.Operations.Topic.Employee
{
    public class GetPersonalTopicTreeOperation : Operation, IGetPersonalTopicTreeOperation
    {
        private readonly IAuthorizationContext _authorizationContext;
        private readonly IGetEmployeeTopicTreeOperation _getEmployeeTopicTreeOperation;

        public GetPersonalTopicTreeOperation(IAuthorizationContext authorizationContext, IGetEmployeeTopicTreeOperation employeeTopicTreeOperation)
        {
            _authorizationContext = authorizationContext;
            _getEmployeeTopicTreeOperation = employeeTopicTreeOperation;
        }

        public async Task<GetEmployeeTopicTreeOperationResponse> Execute()
        {
            var employee = await _authorizationContext.CurrentEmployee();

            var request = new GetEmployeeTopicTreeOperationRequest
            {
                EmployeeId = employee.Id
            };

            return await _getEmployeeTopicTreeOperation.Execute(request);
        }
    }
}