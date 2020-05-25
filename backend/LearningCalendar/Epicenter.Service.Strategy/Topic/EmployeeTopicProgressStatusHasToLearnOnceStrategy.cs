using System.Linq;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Service.Strategy.Interface.Topic;

namespace Epicenter.Service.Strategy.Topic
{
    public class EmployeeTopicProgressStatusHasToLearnOnceStrategy : IEmployeeTopicProgressStatusStrategy
    {
        public Status GetStatus(Employee employee, Domain.Entity.LearningCalendar.Topic topic)
        {
            bool IsTopicLearned(LearningDayTopic dayTopic)
                => dayTopic.TopicId == topic.Id && dayTopic.ProgressStatus == ProgressStatus.Done;

            var relevantGoals = employee.PersonalGoals
                .Where(goal => goal.TopicId == topic.Id)
                .ToList();

            bool isTopicPlanned = relevantGoals.Any(goal => !goal.CompletionDate.HasValue);

            bool allGoalsComplete = relevantGoals.Any() && !isTopicPlanned;

            bool isAnyLearningDayComplete = employee.LearningDays
                .Any(day => day.LearningDayTopics
                    .Any(IsTopicLearned));

            bool hasPlannedLearningDay = employee.LearningDays
                .Any(day => day.LearningDayTopics
                    .Any(dayTopic => dayTopic.TopicId == topic.Id));

            Status status = (allGoalsComplete, isTopicPlanned, isAnyLearningDayComplete, hasPlannedLearningDay) switch
            {
                (true, _, _, _) => Status.Learned,
                (false, false, true, _) => Status.Learned,
                (false, true, _, _) => Status.Planned,
                (false, false, false, true) => Status.Planned,
                (false, false, false, false) => Status.NotPlanned
            };

            return status;
        }
    }
}