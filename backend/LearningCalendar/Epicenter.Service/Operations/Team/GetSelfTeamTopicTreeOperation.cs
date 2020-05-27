using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Extensions;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Exceptions.Team;
using Epicenter.Service.Interface.Operations.Team;
using Epicenter.Service.Interface.Operations.Topic;
using Epicenter.Service.Strategy.Interface.Topic;

namespace Epicenter.Service.Operations.Team
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

        public async Task<GetTeamTopicTreeOperationResponse> Execute()
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