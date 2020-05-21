using System.Collections.Generic;
using System.Linq;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Service.Strategy.Interface.Topic;

namespace Epicenter.Service.Strategy.Topic
{
    public class TeamTopicProgressStatusEmployeesHaveToLearnStrategy : ITeamTopicProgressStatusStrategy
    {
        private readonly IEmployeeTopicProgressStatusStrategy _employeeTopicProgressStatusStrategy;

        public TeamTopicProgressStatusEmployeesHaveToLearnStrategy(IEmployeeTopicProgressStatusStrategy employeeTopicProgressStatusStrategy)
        {
            _employeeTopicProgressStatusStrategy = employeeTopicProgressStatusStrategy;
        }

        public TeamProgressStatus GetStatus(Team team, Domain.Entity.LearningCalendar.Topic topic)
        {
            var employeeStatuses = team.Employees
                .Select(employee => _employeeTopicProgressStatusStrategy.GetStatus(employee, topic))
                .ToList();

            int employeesWhoLearnedCount = employeeStatuses.Count(status => status == Status.Learned);


            Status teamStatus = Status.Learned;
            bool isTopicLearned = employeesWhoLearnedCount == team.Employees.Count;
            if (!isTopicLearned)
            {
                teamStatus = employeeStatuses.Any(status => status == Status.NotPlanned) 
                    ? Status.NotPlanned 
                    : Status.Planned;
            }

            return new TeamProgressStatus
            {
                LearnedCount = employeesWhoLearnedCount,
                TotalCount = team.Employees.Count,
                Status = teamStatus
            };
        }
    }
}