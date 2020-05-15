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
                .Select(root => new TopicTreeNode(root))
                .ToList();
        }
        public List<TopicTreeNode> TopicTrees { get; set; }
        public class TopicTreeNode
        {
            public TopicTreeNode(GetTopicTreeOperationResponse.Topic topic)
            {
                Id = topic.Id;
                Name = topic.Subject;
                Children = topic.Children.Select(c => new TopicTreeNode(c)).ToList();
            }
            public List<TopicTreeNode> Children { get; set; }
            public Guid Id { get; set; }
            public string Name { get; set; }
        }
    }
}