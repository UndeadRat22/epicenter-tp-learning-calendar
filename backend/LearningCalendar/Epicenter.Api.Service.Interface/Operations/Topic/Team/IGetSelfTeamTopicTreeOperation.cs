using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic.Team
{
    public interface IGetSelfTeamTopicTreeOperation
    {
        Task<GetSubordinateTopicTreeOperationResponse> Execute();
    }
}