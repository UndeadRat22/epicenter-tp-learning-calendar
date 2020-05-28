using System;
using System.Collections.Generic;
using System.Linq;
using Epicenter.Api.Model.Tree;
using Epicenter.Service.Interface.Operations.Topic;

namespace Epicenter.Api.Model.Topic
{
    public class TopicModel
    {
        public TopicModel(GetTopicDetailsOperationResponse response)
        {
            Id = response.Id;
            ParentId = response.ParentId;
            ParentSubject = response.ParentSubject;
            Subject = response.Subject;
            Description = response.Description;
            Subordinates = response.Subordinates
                .Select(employee => new Employee(employee))
                .ToList();
            DirectSubordinates = response.DirectSubordinates
                .Select(employee => new Employee(employee))
                .ToList();
            Teams = response.Teams
                .Select(team => new Team(team))
                .ToList();
        }
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public string ParentSubject { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public List<Employee> Subordinates { get; set; }
        public List<Employee> DirectSubordinates { get; set; }
        public List<Team> Teams { get; set; }

        public class Employee
        {
            public Employee(GetTopicDetailsOperationResponse.Employee employee)
            {
                Id = employee.Id;
                FullName = employee.FullName;
                Status = MapStatus(employee.ProgressStatus);
            }
            public Guid Id { get; set; }
            public string FullName { get; set; }
            public TopicProgressStatus Status { get; set; }
        }

        public class Team
        {
            public Team(GetTopicDetailsOperationResponse.Team team)
            {
                TeamId = team.TeamId;
                ManagerId = team.ManagerId;
                ManagerFullName = team.ManagerFullName;
                Status = MapStatus(team.ProgressStatus);
                LearnedCount = team.LearnedCount;
                TotalCount = team.EmployeeCount;
                PlannedCount = team.PlannedCount;
            }
            public Guid ManagerId { get; set; }
            public Guid TeamId { get; set; }
            public string ManagerFullName { get; set; }
            public TopicProgressStatus Status { get; set; }
            public int LearnedCount { get; set; }
            public int PlannedCount { get; set; }
            public int TotalCount { get; set; }
        }

        private static TopicProgressStatus MapStatus(ProgressStatus status)
        {
            return status switch
            {
                ProgressStatus.NotPlanned => TopicProgressStatus.NotPlanned,
                ProgressStatus.Planned => TopicProgressStatus.Planned,
                ProgressStatus.Learned => TopicProgressStatus.Learned,
                _ => throw new ArgumentOutOfRangeException(nameof(status), status, null)
            };
        }
    }
}