using Epicenter.Domain.Entity.LearningCalendar;

namespace Epicenter.Service.Strategy.Interface.Topic
{
    public interface IEmployeeTopicProgressStatusStrategy
    {
        Status GetStatus(Employee employee, Domain.Entity.LearningCalendar.Topic topic);
    }
}