using System;
using System.Collections.Generic;
using System.Linq;
using Epicenter.Service.Interface.Operations.Topic;

namespace Epicenter.Api.Model.Tree
{
    public class TeamTopicTreeModel
    {
        public TeamTopicTreeModel(GetFullSubordinateTopicTreeOperationResponse response)
        {
            Roots = response.Roots.Select(topic => new Topic(topic)).ToList();
        }

        public List<Topic> Roots { get; set; }
        public class Topic
        {
            public Topic(GetFullSubordinateTopicTreeOperationResponse.Topic topic)
            {
                Id = topic.Id;
                Name = topic.Subject;
                Children = topic.Children.Select(child => new Topic(child)).ToList();
                LearnedEmployees = topic.LearnedEmployees.Select(employee => new Employee(employee)).ToList();
                PlannedEmployees = topic.PlannedEmployees.Select(employee => new Employee(employee)).ToList();
                NotPlannedEmployees = topic.NotPlannedEmployees.Select(employee => new Employee(employee)).ToList();
            }
            public List<Topic> Children { get; set; }
            public Guid Id { get; set; }
            public string Name { get; set; }
            public List<Employee> LearnedEmployees { get; set; }
            public List<Employee> PlannedEmployees { get; set; }
            public List<Employee> NotPlannedEmployees { get; set; }
        }

        public class Employee
        {
            public Employee(GetFullSubordinateTopicTreeOperationResponse.Employee employee)
            {
                Id = employee.Id;
                FullName = employee.FullName;
            }
            public Guid Id { get; set; }
            public string FullName { get; set; }
        }
    }
}