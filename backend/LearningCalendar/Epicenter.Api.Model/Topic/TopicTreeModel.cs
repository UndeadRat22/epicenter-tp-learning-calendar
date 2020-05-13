using System;
using System.Collections.Generic;
using System.Linq;
using Epicenter.Service.Interface.Operations.Topic;

namespace Epicenter.Api.Model.Topic
{
    public class TopicTreeModel
    {
        public TopicTreeModel(GetTopicTreeOperationResponse response)
        {
            TopicTrees = response.Roots
                .Select(root => new Topic(root))
                .ToList();
        }
        public List<Topic> TopicTrees { get; set; }
        public class Topic
        {
            public Topic(GetTopicTreeOperationResponse.Topic topic)
            {
                Id = topic.Id;
                Name = topic.Subject;
                Children = topic.Children.Select(c => new Topic(c)).ToList();
            }
            public List<Topic> Children { get; set; }
            public Guid Id { get; set; }
            public string Name { get; set; }
        }
    }
}