using System;
using System.Collections.Generic;
using System.Linq;
using Epicenter.Service.Interface.Operations.Topic;
using Epicenter.Service.Interface.Operations.Topic.Employee;

namespace Epicenter.Api.Model.Tree
{
    public class EmployeeTopicTreeModel
    {
        public EmployeeTopicTreeModel(GetEmployeeTopicTreeOperationResponse response)
        {
            TopicRoots = response.Roots?.Select(MapTopic).ToList() 
                    ?? new List<EmployeeTopicTreeTopic>();
        }

        private EmployeeTopicTreeTopic MapTopic(GetEmployeeTopicTreeOperationResponse.Topic topic)
        {
            return new EmployeeTopicTreeTopic
            {
                Children = topic.Children.Select(MapTopic).ToList(),
                Status = topic.Status switch {
                    ProgressStatus.NotPlanned => TopicProgressStatus.NotPlanned,
                    ProgressStatus.Planned => TopicProgressStatus.Planned,
                    ProgressStatus.Learned => TopicProgressStatus.Learned,
                    _ => throw new ArgumentOutOfRangeException()
                },
                Name = topic.Subject,
                Id = topic.Id
            };
        }

        public List<EmployeeTopicTreeTopic> TopicRoots { get; set; }
        public class EmployeeTopicTreeTopic
        {
            public List<EmployeeTopicTreeTopic> Children { get; set; }
            public Guid Id { get; set; }
            public string Name { get; set; }
            public TopicProgressStatus Status { get; set; }
        }
    }
}