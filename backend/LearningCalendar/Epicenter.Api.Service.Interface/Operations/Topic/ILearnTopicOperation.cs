using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic
{
    public interface ILearnTopicOperation
    {
        Task Execute(LearnTopicOperationRequest request);
    }

    public class LearnTopicOperationRequest
    {
        public Guid TopicId { get; set; }
    }

}