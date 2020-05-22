using System;
using System.Collections.Generic;
using System.Linq;
using Epicenter.Service.Interface.Operations.Goal;

namespace Epicenter.Api.Model.Goal
{
    public class PersonalGoalListModel
    {
        public PersonalGoalListModel(GetEmployeeGoalsOperationResponse response)
        {
            Goals = response.PersonalGoals.Select(goal => new PersonalGoal
            {
                Id = goal.Id,
                CompletionDate = goal.CompletionDate,
                Topic = new PersonalGoalTopic
                {
                    Id = goal.Topic.Id,
                    Subject = goal.Topic.Subject,
                    Description = goal.Topic.Description,
                }
            }).ToList();
        }

        public List<PersonalGoal> Goals { get; set; }

        public class PersonalGoal
        {
            public Guid Id { get; set; }
            public DateTime? CompletionDate { get; set; }
            public PersonalGoalTopic Topic { get; set; }
            public bool IsCompleted => CompletionDate.HasValue;
        }

        public class PersonalGoalTopic
        {
            public Guid Id { get; set; }
            public string Subject { get; set; }
            public string Description { get; set; }
        }
    }
}