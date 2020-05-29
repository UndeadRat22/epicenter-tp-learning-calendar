using System;
using System.Collections.Generic;
using System.Linq;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Service.Strategy.Interface.Topic;

namespace Epicenter.Service.Strategy.Topic
{
    public class EmployeeTopicProgressStatusStrategy : IEmployeeTopicProgressStatusStrategy
    {
        public Status GetStatus(Employee employee, Domain.Entity.LearningCalendar.Topic topic)
        {
            var relevantDays = employee
                .LearningDays
                .Where(day => day.GetDayTopicByTopicId(topic.Id) != null)
                .ToList();

            bool hasCompleteGoals = employee.PersonalGoals
                .Any(goal => goal.TopicId == topic.Id && goal.IsComplete);

            if (!relevantDays.Any())
            {
                if (hasCompleteGoals)
                {
                    return Status.Learned;
                }
                return Status.NotPlanned;
            }

            bool hasIncompleteGoals = employee.PersonalGoals
                .Any(goal => goal.TopicId == topic.Id && !goal.IsComplete);

            bool isPlanned = IsPlanned(relevantDays, topic.Id);
            bool isComplete = IsComplete(relevantDays, hasIncompleteGoals, topic.Id);

            return (isPlanned, isComplete) switch
            {
                (true, _) => Status.Planned,
                (false, true) => Status.Learned,
                (false, false) => Status.NotPlanned
            };
        }

        private bool IsPlanned(IList<LearningDay> learningDays, Guid topicId)
        {
            var futureDays = learningDays
                .Where(day => day.Date >= DateTime.Today);

            return futureDays.Any(day => !day.GetDayTopicByTopicId(topicId).IsComplete);
        }

        private bool IsComplete(IList<LearningDay> learningDays, bool hasIncompleteGoals, Guid topicId)
        {
            bool learnedAtLeastOnce = learningDays.Any(day =>
                day.GetDayTopicByTopicId(topicId).IsComplete);

            return learnedAtLeastOnce && !hasIncompleteGoals;
        }
    }
}