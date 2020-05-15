using System.Threading.Tasks;
using Epicenter.Service.Interface.Operations.Topic;

namespace Epicenter.Service.Operations.Topic
{
    public class GetTopicDetailsOperation : IGetTopicDetailsOperation
    {
        public Task<GetTopicDetailsOperationResponse> Execute(GetTopicDetailsOperationRequest request)
        {
            throw new System.NotImplementedException();
        }
    }
}