using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Team
{
    public interface IGetSpecificTeamTopicTreeOperation
    {
        Task<GetTeamTopicTreeOperationResponse> Execute(GetSpecificTeamTopicTreeOperationRequest request);
    }

    public class GetSpecificTeamTopicTreeOperationRequest
    {
        public Guid EmployeeId { get; set; }
    }
}