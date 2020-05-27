using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic.Team
{
    public interface IGetSpecificTeamTopicTreeOperation
    {
        Task<GetSubordinateTopicTreeOperationResponse> Execute(GetSpecificTeamTopicTreeOperationRequest request);
    }

    public class GetSpecificTeamTopicTreeOperationRequest
    {
        public Guid EmployeeId { get; set; }
    }
}