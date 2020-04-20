using System;
using System.Collections.Generic;
using System.Linq;
using Epicenter.Service.Interface.Operations.Topic;

namespace Epicenter.Api.Model.Topic
{
    public class TopicListModel
    {
        public TopicListModel(GetAllTopicsOperationResponse response)
        {
            Topics = response.Topics
                .Select(topic => new Topic
                {
                    Id = topic.Id,
                    Subject = topic.Subject
                }).ToList();
        }
        public List<Topic> Topics { get; set; }
        public class Topic
        {
            public Guid Id { get; set; }
            public string Subject { get; set; }
        }
    }
}