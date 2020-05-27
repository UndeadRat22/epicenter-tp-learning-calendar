using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Epicenter.Service.Interface.Operations.Topic;
using Epicenter.Service.Interface.Operations.Topic.Team;

namespace Epicenter.Api.Model.Tree
{
    public class TeamTopicTreeModel
    {
        public TeamTopicTreeModel(GetSubordinateTopicTreeOperationResponse response)
        {
            TopicRoots = response.Roots.Select(topic => new Topic(topic)).ToList();
        }

        public List<Topic> TopicRoots { get; set; }
        public class Topic
        {
            public Topic(GetSubordinateTopicTreeOperationResponse.Topic topic)
            {
                Id = topic.Id;
                Name = topic.Subject;
                Description = topic.Description;
                Children = topic.Children.Select(child => new Topic(child)).ToList();
                LearnedEmployees = topic.LearnedEmployees.Select(employee => new Employee(employee)).ToList();
                PlannedEmployees = topic.PlannedEmployees.Select(employee => new Employee(employee)).ToList();
                NotPlannedEmployees = topic.NotPlannedEmployees.Select(employee => new Employee(employee)).ToList();
                TotalStatus = topic.TotalStatus switch
                {
                    GetSubordinateTopicTreeOperationResponse.Status.NotPlanned => TopicProgressStatus.NotPlanned,
                    GetSubordinateTopicTreeOperationResponse.Status.Planned => TopicProgressStatus.Planned,
                    GetSubordinateTopicTreeOperationResponse.Status.Learned => TopicProgressStatus.Learned,
                    _ => throw new ArgumentOutOfRangeException()
                };
            }
            public List<Topic> Children { get; set; }
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public List<Employee> LearnedEmployees { get; set; }
            public List<Employee> PlannedEmployees { get; set; }
            public List<Employee> NotPlannedEmployees { get; set; }
            public TopicProgressStatus TotalStatus { get; set; }
        }

        public class Employee
        {
            public Employee(GetSubordinateTopicTreeOperationResponse.Employee employee)
            {
                Id = employee.Id;
                FullName = employee.FullName;
            }
            public Guid Id { get; set; }
            public string FullName { get; set; }
        }
    }
}