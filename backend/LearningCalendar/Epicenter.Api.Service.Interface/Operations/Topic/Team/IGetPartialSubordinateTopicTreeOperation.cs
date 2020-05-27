using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic.Team
{
    public interface IGetPartialSubordinateTopicTreeOperation
    {
        Task<GetSubordinateTopicTreeOperationResponse> Execute(GetPartialSubordinateTopicTreeOperationRequest request);
    }

    public class GetPartialSubordinateTopicTreeOperationRequest
    {
        public List<Guid> EmployeeIds { get; set; }
    }
}