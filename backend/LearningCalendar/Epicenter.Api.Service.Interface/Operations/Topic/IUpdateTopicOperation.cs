using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic
{
    public interface IUpdateTopicOperation
    {
        public Task<UpdateTopicOperationResponse> Execute(UpdateTopicOperationRequest request);
    }

    public class UpdateTopicOperationResponse
    {
        public Topic UpdatedTopic { get; set; }
        public class Topic
        {
            public Guid Id { get; set; }
            public string Subject { get; set; }
            public string Description { get; set; }
            public Guid? ParentTopicId { get; set; }
            public string ParentTopicSubject { get; set; }
        }
    }

    public class UpdateTopicOperationRequest
    {
        public Topic OldTopic { get; set; }
        public Topic NewTopic { get; set; }
        public class Topic
        {
            public Guid Id { get; set; }
            public string Subject { get; set; }
            public string Description { get; set; }
            public Guid? ParentTopicId { get; set; }
        }
    }
}