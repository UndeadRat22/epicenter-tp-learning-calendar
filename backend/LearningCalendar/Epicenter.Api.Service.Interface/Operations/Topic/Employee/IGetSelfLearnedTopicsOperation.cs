using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic.Employee
{
    public interface IGetSelfLearnedTopicsOperation
    {
        Task<GetTopicListOperationResponse> Execute();
    }

}