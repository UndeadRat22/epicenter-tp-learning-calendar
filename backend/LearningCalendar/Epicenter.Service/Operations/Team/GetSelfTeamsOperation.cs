using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Team;

namespace Epicenter.Service.Operations.Team
{
    public class GetSelfTeamsOperation : Operation, IGetSelfTeamsOperation
    {
        private readonly IGetTeamDetailsOperation _getTeamDetailsOperation;
        private readonly IAuthorizationContext _authorizationContext;

        public GetSelfTeamsOperation(IGetTeamDetailsOperation teamDetailsOperation, IAuthorizationContext authorizationContext)
        {
            _getTeamDetailsOperation = teamDetailsOperation;
            _authorizationContext = authorizationContext;
        }

        public async Task<GetTeamDetailsOperationResponse> Execute()
        {
            var employee = await _authorizationContext.CurrentEmployee();

            var getMySubordinatesRequest = new GetTeamDetailsOperationRequest
            {
                ManagerId = employee.Id
            };
           return await _getTeamDetailsOperation.Execute(getMySubordinatesRequest);
        }
    }
}