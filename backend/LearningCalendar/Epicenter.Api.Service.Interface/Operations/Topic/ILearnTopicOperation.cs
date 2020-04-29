using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic
{
    public interface ILearnTopicOperation
    {
        Task<LearnTopicOperationResponse> Execute(LearnTopicOperationRequest request);
    }

    public class LearnTopicOperationRequest
    {
        public Guid LearningDayId { get; set; }
        public Guid TopicId { get; set; }
    }

    public class LearnTopicOperationResponse
    {
    }
}