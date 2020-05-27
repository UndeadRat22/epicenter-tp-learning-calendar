using System;
using System.Collections.Generic;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Service.Strategy.Interface.Topic;

namespace Epicenter.Service.Strategy.Topic
{
    public class EmployeeCollectionTopicProgressStatusStrategy : IEmployeeCollectionTopicProgressStatusStrategy
    {
        private readonly IEmployeeTopicProgressStatusStrategy _employeeTopicProgressStatusStrategy;

        public EmployeeCollectionTopicProgressStatusStrategy(IEmployeeTopicProgressStatusStrategy employeeTopicProgressStatusStrategy)
        {
            _employeeTopicProgressStatusStrategy = employeeTopicProgressStatusStrategy;
        }

        public EmployeeCollectionStatus GetEmployeeCollectionStatusForTopic(IEnumerable<Employee> employees, Domain.Entity.LearningCalendar.Topic topic)
        {
            var collectionStatus = new EmployeeCollectionStatus();

            foreach (Employee employee in employees)
            {
                var employeeStatus = _employeeTopicProgressStatusStrategy.GetStatus(employee, topic);
                switch (employeeStatus)
                {
                    case Status.NotPlanned:
                        collectionStatus.OtherEmployees.Add(employee);
                        break;
                    case Status.Planned:
                        collectionStatus.PlannedEmployees.Add(employee);
                        break;
                    case Status.Learned:
                        collectionStatus.LearnedEmployees.Add(employee);
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }
            return collectionStatus;
        }
    }
}