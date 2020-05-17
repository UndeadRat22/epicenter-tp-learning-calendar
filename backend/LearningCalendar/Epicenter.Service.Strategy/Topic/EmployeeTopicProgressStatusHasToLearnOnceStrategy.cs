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

            bool isTopicLearned = employee.LearningDays.Any(day => day.LearningDayTopics.Any(IsTopicLearned));

            return isTopicLearned
                ? Status.Learned
                : Status.NotLearned;
        }
    }
}