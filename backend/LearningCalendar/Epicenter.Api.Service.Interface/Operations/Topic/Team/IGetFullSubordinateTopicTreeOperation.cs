using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic.Team
{
    public interface IGetFullSubordinateTopicTreeOperation
    {
        Task<GetSubordinateTopicTreeOperationResponse> Execute();
    }
}