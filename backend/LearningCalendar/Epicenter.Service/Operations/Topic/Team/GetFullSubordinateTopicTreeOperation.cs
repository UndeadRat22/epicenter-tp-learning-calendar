using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Epicenter.Service.Interface.Operations.Topic.Team;

namespace Epicenter.Service.Operations.Topic.Team
{
    public class GetFullSubordinateTopicTreeOperation : Operation, IGetFullSubordinateTopicTreeOperation
    {
        private readonly IGetPartialSubordinateTopicTreeOperation _getPartialSubordinateTopicTreeOperation;

        public GetFullSubordinateTopicTreeOperation(IGetPartialSubordinateTopicTreeOperation partialSubordinateTopicTreeOperation)
        {
            _getPartialSubordinateTopicTreeOperation = partialSubordinateTopicTreeOperation;
        }
        public async Task<GetSubordinateTopicTreeOperationResponse> Execute()
        {
            var request = new GetPartialSubordinateTopicTreeOperationRequest
            {
                EmployeeIds = new List<Guid>()
            };
            return await _getPartialSubordinateTopicTreeOperation.Execute(request);
        }
    }
}