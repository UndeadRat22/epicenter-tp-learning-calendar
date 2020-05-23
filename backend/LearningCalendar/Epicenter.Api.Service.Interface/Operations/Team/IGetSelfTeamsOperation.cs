using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Team
{
    public interface IGetSelfTeamsOperation
    {
        public Task<GetTeamDetailsOperationResponse> Execute();
    }
}