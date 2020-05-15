using System.Linq;
using System.Threading.Tasks;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Team;

namespace Epicenter.Service.Operations.Team
{
    public class GetSelfTeamsOperation : IGetSelfTeamsOperation
    {
        private readonly IGetTeamDetailsOperation _getTeamDetailsOperation;
        private readonly IAuthorizationContext _authorizationContext;

        public GetSelfTeamsOperation(IGetTeamDetailsOperation teamDetailsOperation, IAuthorizationContext authorizationContext)
        {
            _getTeamDetailsOperation = teamDetailsOperation;
            _authorizationContext = authorizationContext;
        }

        public async Task<GetSelfTeamsOperationResponse> Execute()
        {
            var employee = await _authorizationContext.CurrentEmployee();

            var getMySubordinatesRequest = new GetTeamDetailsOperationRequest
            {
                ManagerId = employee.Id
            };
            var subordinates = await _getTeamDetailsOperation.Execute(getMySubordinatesRequest);

            GetTeamDetailsOperationResponse peers;
            if (employee.IsTopLevelManager)
            {
                peers = null;
            }
            else
            {
                var getMyPeersRequest = new GetTeamDetailsOperationRequest
                {
                    ManagerId = employee.Team.Manager.Id
                };

                peers = await _getTeamDetailsOperation.Execute(getMyPeersRequest);
            }

            return MapToResponse(subordinates, peers);
        }

        private GetSelfTeamsOperationResponse MapToResponse(GetTeamDetailsOperationResponse subordinates, GetTeamDetailsOperationResponse peers)
        {
            return new GetSelfTeamsOperationResponse
            {
                ManagedTeam = subordinates,
                BelongingToTeam = peers
            };
        }
    }
}