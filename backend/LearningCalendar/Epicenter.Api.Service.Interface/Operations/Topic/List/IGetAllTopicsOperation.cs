using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic
{
    public interface IGetAllTopicsOperation
    {
        Task<GetTopicListOperationResponse> Execute();
    }
}