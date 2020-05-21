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
                .Select(employee => new TopicEmployee
                {
                    FullName = employee.FullName,
                    Id = employee.Id,
                    ProgressStatus = employee.ProgressStatus.ToString()
                }).ToList();
            Teams = response.Teams
                .Select(team => new TeamTopic
                {
                    TeamId = team.TeamId,
                    ManagerId = team.ManagerId,
                    ManagerFullName = team.ManagerFullName,
                    ProgressStatus = team.ProgressStatus.ToString(),
                    LearnedCount = team.EmployeeWhoLearnedCount,
                    TotalCount = team.EmployeeCount
                }).ToList();
        }
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public string ParentSubject { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public List<TopicEmployee> Employees { get; set; }
        public List<TeamTopic> Teams { get; set; }

        public class TopicEmployee
        {
            public Guid Id { get; set; }
            public string FullName { get; set; }
            public string ProgressStatus { get; set; }
        }

        public class TeamTopic
        {
            public Guid ManagerId { get; set; }
            public Guid TeamId { get; set; }
            public string ManagerFullName { get; set; }
            public string ProgressStatus { get; set; }
            public int LearnedCount { get; set; }
            public int TotalCount { get; set; }
        }
    }
}