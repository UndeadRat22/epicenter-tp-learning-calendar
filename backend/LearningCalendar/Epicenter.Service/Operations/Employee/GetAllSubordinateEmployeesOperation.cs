using System.Linq;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Extensions;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Employee;

namespace Epicenter.Service.Operations.Employee
{
    public class GetAllSubordinateEmployeesOperation : Operation, IGetAllSubordinateEmployeesOperation
    {
        private readonly IAuthorizationContext _authorizationContext;

        public GetAllSubordinateEmployeesOperation(IAuthorizationContext authorizationContext)
        {
            _authorizationContext = authorizationContext;
        }

        public async Task<GetAllSubordinateEmployeesOperationResponse> Execute()
        {
            var teamTree = await _authorizationContext.GetTeamTree();
            var employees = teamTree
                .Flatten(tree => tree.Employees.Select(employee => employee.ManagedTeam))
                .SelectMany(team => team.Employees)
                .ToList();

            var mappedEmployees = employees
                .Select(employee => new GetAllSubordinateEmployeesOperationResponse.Employee
                {
                    Id = employee.Id,
                    FullName = employee.FullName,
                    ManagedEmployeesCount = employee.ManagedTeam?.Employees.Count ?? 0,
                    ManagerId = employee.Team.Manager.Id,
                    ManagerFullName = employee.Team.Manager.FullName
                })
                .ToList();

            var response = new GetAllSubordinateEmployeesOperationResponse
            {
                Employees = mappedEmployees
            };

            return response;
        }
    }
}