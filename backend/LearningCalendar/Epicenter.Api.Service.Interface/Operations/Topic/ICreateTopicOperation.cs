using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic
{
    public interface ICreateTopicOperation
    {
        public Task<CreateTopicOperationResponse> Execute(CreateTopicOperationRequest request);
    }

    public class CreateTopicOperationRequest
    {
        public Guid? ParentTopic { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
    }

    public class CreateTopicOperationResponse
    {
        public Guid Guid { get; set; }
    }
}