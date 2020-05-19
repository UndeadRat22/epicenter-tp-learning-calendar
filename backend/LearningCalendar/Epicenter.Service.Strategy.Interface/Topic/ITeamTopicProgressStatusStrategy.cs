using Epicenter.Domain.Entity.LearningCalendar;

namespace Epicenter.Service.Strategy.Interface.Topic
{
    public interface ITeamTopicProgressStatusStrategy
    {
        TeamProgressStatus GetStatus(Team team, Domain.Entity.LearningCalendar.Topic topic);
    }

    public class TeamProgressStatus
    {
        public int LearnedCount { get; set; }
        public int TotalCount { get; set; }
        public Status Status { get; set; }
    }
}