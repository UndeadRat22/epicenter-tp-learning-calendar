using System.Linq;
using System.Threading.Tasks;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Team;

namespace Epicenter.Service.Operations.Team
{
    public class GetSelfTeamsOperation : IGetSelfTeamsOperation
    {
        private readonly IGetDirectSubordinatesOperation _getDirectSubordinatesOperation;
        private readonly IAuthorizationContext _authorizationContext;

        public GetSelfTeamsOperation(IGetDirectSubordinatesOperation directSubordinatesOperation, IAuthorizationContext authorizationContext)
        {
            _getDirectSubordinatesOperation = directSubordinatesOperation;
            _authorizationContext = authorizationContext;
        }

        public async Task<GetSelfTeamsOperationResponse> Execute()
        {
            var employee = await _authorizationContext.CurrentEmployee();

            var getMySubordinatesRequest = new GetDirectSubordinatesOperationRequest
            {
                ManagerId = employee.Id
            };
            var subordinates = await _getDirectSubordinatesOperation.Execute(getMySubordinatesRequest);

            GetDirectSubordinatesOperationResponse peers;
            if (employee.IsTopLevelManager)
            {
                peers = null;
            }
            else
            {
                var getMyPeersRequest = new GetDirectSubordinatesOperationRequest
                {
                    ManagerId = employee.Team.Manager.Id
                };

                peers = await _getDirectSubordinatesOperation.Execute(getMyPeersRequest);
            }

            return MapToResponse(subordinates, peers);
        }

        private GetSelfTeamsOperationResponse MapToResponse(GetDirectSubordinatesOperationResponse subordinates, GetDirectSubordinatesOperationResponse peers)
        {
            return new GetSelfTeamsOperationResponse
            {
                ManagedTeam = MapTeam(subordinates),
                BelongingToTeam = MapTeam(peers)
            };
        }

        private GetSelfTeamsOperationResponse.Team MapTeam(GetDirectSubordinatesOperationResponse getDirectSubordinatesResponse)
        {
            if (getDirectSubordinatesResponse == null)
            {
                return null;
            }

            var employees = getDirectSubordinatesResponse.Employees.Select(employee =>
                new GetSelfTeamsOperationResponse.Employee
                {
                    Id = employee.Id,
                    Name = employee.Name
                }).ToList();

            var team = new GetSelfTeamsOperationResponse.Team
            {
                Employees = employees,
                ManagerId = getDirectSubordinatesResponse.ManagerId
            };

            return team;
        }
    }
}