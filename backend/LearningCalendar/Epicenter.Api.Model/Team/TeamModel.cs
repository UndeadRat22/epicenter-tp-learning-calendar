using System;
using System.Collections.Generic;
using System.Linq;
using Epicenter.Service.Interface.Operations.Team;

namespace Epicenter.Api.Model.Team
{
    public class TeamModel
    {
        public TeamModel(GetTeamDetailsOperationResponse response)
        {
            ManagerId = response.Team.Manager.Id;
            ManagerName = response.Team.Manager.Name;
            Employees = response.Team.Employees
                .Select(employee => new Employee(employee))
                .ToList();
        }

        public Guid ManagerId { get; set; }
        public string ManagerName { get; set; }
        public List<Employee> Employees { get; set; }
        public class Employee
        {
            public Employee(GetTeamDetailsOperationResponse.Employee employee)
            {
                Id = employee.Id;
                Name = employee.Name;
                GoalTopics = employee.GoalTopics
                    .Select(goal => new Goal
                    {
                        Topic = goal.Topic,
                        TopicId = goal.TopicId
                    }).ToList();
                Limit = new Limit
                {
                    LearningDaysPerQuarter = employee.Limit.LearningDaysPerQuarter,
                    CreatedLearningDaysThisQuarter = employee.Limit.CreatedLearningDaysThisQuarter
                };
            }
            public Guid Id { get; set; }
            public string Name { get; set; }
            public List<Goal> GoalTopics { get; set; }
            public Limit Limit { get; set; }
        }

        public class Limit
        {
            public int LearningDaysPerQuarter { get; set; }
            public int CreatedLearningDaysThisQuarter { get; set; }
        }
        public class Goal
        {
            public Guid TopicId { get; set; }
            public string Topic { get; set; }
        }
    }
}