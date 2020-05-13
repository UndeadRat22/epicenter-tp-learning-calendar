using System.Threading.Tasks;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Employee;

namespace Epicenter.Service.Operations.Employee
{
    public class GetEmployeeDetailsOperation : IGetEmployeeDetailsOperation
    {
        private readonly IAuthorizationContext _authorizationContext;

        public GetEmployeeDetailsOperation(IAuthorizationContext authorizationContext)
        {
            _authorizationContext = authorizationContext;
        }

        public async Task<GetEmployeeDetailsOperationResponse> Execute()
        {
            var employee = await _authorizationContext.CurrentEmployee();

            return new GetEmployeeDetailsOperationResponse
            {
                Email = employee.Identity.Email,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                ImageData = employee.Image.Value,
                IsTopLevelManager = employee.IsTopLevelManager
            };
        }
    }
}