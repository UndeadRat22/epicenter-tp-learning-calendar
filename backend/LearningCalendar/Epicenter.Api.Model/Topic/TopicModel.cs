using System;
using System.Collections.Generic;
using System.Linq;
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
            Employees = response.Employees
                .Select(employee => new Employee
                {
                    FullName = employee.FullName,
                    Id = employee.Id,
                    ProgressStatus = MapProgressStatus(employee.ProgressStatus)
                }).ToList();
            Teams = response.Teams
                .Select(team => new Team
                {
                    TeamId = team.TeamId,
                    ManagerId = team.ManagerId,
                    ManagerFullName = team.ManagerFullName,
                    ProgressStatus = MapProgressStatus(team.ProgressStatus)
                }).ToList();
        }
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public string ParentSubject { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public List<Employee> Employees { get; set; }
        public List<Team> Teams { get; set; }

        public class Employee
        {
            public Guid Id { get; set; }
            public string FullName { get; set; }
            public ProgressStatus ProgressStatus { get; set; }
        }

        public class Team
        {
            public Guid ManagerId { get; set; }
            public Guid TeamId { get; set; }
            public string ManagerFullName { get; set; }
            public ProgressStatus ProgressStatus { get; set; }
        }

        public enum ProgressStatus
        {
            NotLearned,
            Learned
        }

        private ProgressStatus MapProgressStatus(GetTopicDetailsOperationResponse.ProgressStatus status)
        {
            var result = status switch
            {
                GetTopicDetailsOperationResponse.ProgressStatus.NotLearned => ProgressStatus.NotLearned,
                GetTopicDetailsOperationResponse.ProgressStatus.Learned => ProgressStatus.Learned,
                _ => throw new ArgumentOutOfRangeException(nameof(status), status, null)
            };
            return result;
        }
    }
}