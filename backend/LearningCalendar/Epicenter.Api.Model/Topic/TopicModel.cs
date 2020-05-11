using System;
using Epicenter.Service.Interface.Operations.Topic;

namespace Epicenter.Api.Model.Topic
{
    public class TopicModel
    {
        public TopicModel(CreateTopicOperationResponse response)
        {
            Id = response.Id;
        }
        public Guid Id { get; set; }
    }
}