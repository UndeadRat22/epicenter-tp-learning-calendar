using Epicenter.Domain.Entity.LearningCalendar;

namespace Epicenter.Service.Strategy.Interface.Topic
{
    public interface ITeamTopicProgressStatusStrategy
    {
        Status GetStatus(Team team, Domain.Entity.LearningCalendar.Topic topic);
    }
}