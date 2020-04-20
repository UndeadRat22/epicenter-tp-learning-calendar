﻿using System;
using System.Collections.Generic;
using System.Linq;
using Epicenter.Service.Interface.Operations.Team;

namespace Epicenter.Api.Model.Team
{
    public class TeamModel
    {
        public TeamModel(GetDirectSubordinatesOperationResponse response)
        {
            ManagerId = response.ManagerId;
            Employees = response.Employees
                .Select(employee => new Employee
                {
                    Id = employee.Id,
                    Name = employee.Name,
                    GoalTopics = employee.GoalTopics
                        .Select(goal => new Goal
                        {
                            Topic = goal.Topic,
                            TopicId = goal.TopicId
                        }).ToList()
                }).ToList();
        }

        public Guid ManagerId { get; set; }
        public List<Employee> Employees { get; set; }
        public class Employee
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public List<Goal> GoalTopics { get; set; }
        }

        public class Goal
        {
            public Guid TopicId { get; set; }
            public string Topic { get; set; }
        }
    }
}