using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Team
{
    public interface IGetSelfTeamsOperation
    {
        public Task<GetSelfTeamsOperationResponse> Execute();
    }

    public class GetSelfTeamsOperationResponse
    {
        public GetTeamDetailsOperationResponse ManagedTeam { get; set; }
        public GetTeamDetailsOperationResponse BelongingToTeam { get; set; }
    }
}