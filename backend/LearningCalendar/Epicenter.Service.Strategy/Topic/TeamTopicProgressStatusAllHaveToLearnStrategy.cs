using System.Collections.Generic;
using System.Linq;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Service.Strategy.Interface.Topic;

namespace Epicenter.Service.Strategy.Topic
{
    public class TeamTopicProgressStatusAllHaveToLearnStrategy : ITeamTopicProgressStatusStrategy
    {
        private readonly IEmployeeTopicProgressStatusStrategy _employeeTopicProgressStatusStrategy;

        public TeamTopicProgressStatusAllHaveToLearnStrategy(IEmployeeTopicProgressStatusStrategy employeeTopicProgressStatusStrategy)
        {
            _employeeTopicProgressStatusStrategy = employeeTopicProgressStatusStrategy;
        }

        public Status GetStatus(Team team, Domain.Entity.LearningCalendar.Topic topic)
        {
            Status managerStatus = _employeeTopicProgressStatusStrategy.GetStatus(team.Manager, topic);
            IEnumerable<Status> employeeStatuses =
                team.Employees.Select(employee => _employeeTopicProgressStatusStrategy.GetStatus(employee, topic));

            IEnumerable<Status> allStatuses = new List<Status>
            {
                managerStatus
            }.Concat(employeeStatuses);

            bool isTopicLearned = allStatuses.All(status => status == Status.Learned);

            return isTopicLearned
                ? Status.Learned
                : Status.NotLearned;
        }
    }
}