using System;
using System.Collections.Generic;
using System.Linq;
using Epicenter.Service.Interface.Operations.Goal;

namespace Epicenter.Api.Model.Goal
{
    public class PersonalGoalListModel
    {
        public PersonalGoalListModel(GetPersonalGoalsOperationResponse response)
        {
            Goals = response.PersonalGoals.Select(goal => new PersonalGoal
            {
                Id = goal.Id,
                CompletionDate = goal.CompletionDate,
                TopicId = goal.TopicId
            }).ToList();
        }

        public List<PersonalGoal> Goals { get; set; }

        public class PersonalGoal
        {
            public Guid Id { get; set; }
            public DateTime? CompletionDate { get; set; }
            public Guid TopicId { get; set; }
            public bool IsCompleted => CompletionDate.HasValue;
        }
    }
}