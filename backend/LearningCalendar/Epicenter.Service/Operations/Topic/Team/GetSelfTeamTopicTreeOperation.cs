using System.Threading.Tasks;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Topic.Team;

namespace Epicenter.Service.Operations.Topic.Team
{
    public class GetSelfTeamTopicTreeOperation : Operation, IGetSelfTeamTopicTreeOperation
    {
        private readonly IGetSpecificTeamTopicTreeOperation _getSpecificTeamTopicTreeOperation;
        private readonly IAuthorizationContext _authorizationContext;

        public GetSelfTeamTopicTreeOperation(IGetSpecificTeamTopicTreeOperation specificTeamTopicTreeOperation,
            IAuthorizationContext authorizationContext)
        {
            _getSpecificTeamTopicTreeOperation = specificTeamTopicTreeOperation;
            _authorizationContext = authorizationContext;
        }

        public async Task<GetSubordinateTopicTreeOperationResponse> Execute()
        {
            var employee = await _authorizationContext.CurrentEmployee();
            var request = new GetSpecificTeamTopicTreeOperationRequest
            {
                EmployeeId = employee.Id
            };
            return await _getSpecificTeamTopicTreeOperation.Execute(request);
        }
    }
}