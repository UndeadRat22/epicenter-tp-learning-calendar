using System;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Exceptions.Team;
using Epicenter.Service.Interface.Operations.Topic.Team;

namespace Epicenter.Service.Operations.Topic.Team
{
    public class GetSpecificTeamTopicTreeOperation : Operation, IGetSpecificTeamTopicTreeOperation
    {
        private readonly IGetPartialSubordinateTopicTreeOperation _getPartialSubordinateTopicTreeOperation;
        private readonly IAuthorizationContext _authorizationContext;
        private readonly ITeamRepository _teamRepository;

        public GetSpecificTeamTopicTreeOperation(
            IGetPartialSubordinateTopicTreeOperation partialSubordinateTopicTreeOperation, 
            IAuthorizationContext authorizationContext, 
            ITeamRepository teamRepository)
        {
            _getPartialSubordinateTopicTreeOperation = partialSubordinateTopicTreeOperation;
            _authorizationContext = authorizationContext;
            _teamRepository = teamRepository;
        }


        public async Task<GetSubordinateTopicTreeOperationResponse> Execute(GetSpecificTeamTopicTreeOperationRequest request)
        {
            var manager = await _authorizationContext.GetEmployeeIfAuthorizedFor(request.EmployeeId);

            if (manager == null)
            {
                throw new ApplicationException($"Not authorized for '{request.EmployeeId}'");
            }

            var team = await _teamRepository.GetByManagerIdAsync(manager.Id);
            if (team == null)
            {
                throw new EmployeeDoesNotManageAnyTeamException(manager.Id);
            }

            var getPartialTreeRequest = new GetPartialSubordinateTopicTreeOperationRequest
            {
                EmployeeIds = team.Employees.Select(employee => employee.Id).ToList()
            };

            return await _getPartialSubordinateTopicTreeOperation.Execute(getPartialTreeRequest);
        }

    }
}