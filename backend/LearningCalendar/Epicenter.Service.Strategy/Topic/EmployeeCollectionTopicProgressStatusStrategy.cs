using System;
using System.Collections.Generic;
using System.Linq;
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

        public EmployeeCollectionStatus GetStatus(IEnumerable<Employee> employees, Domain.Entity.LearningCalendar.Topic topic)
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
            AddTotalStatus(collectionStatus);

            return collectionStatus;
        }

        private void AddTotalStatus(EmployeeCollectionStatus collectionStatus)
        {
            bool planning = collectionStatus.PlannedEmployees.Any();
            bool learned = collectionStatus.LearnedEmployees.Any();
            bool notPlanning = collectionStatus.OtherEmployees.Any();

            collectionStatus.TotalStatus =
                (learned, planning, notPlanning) switch
                {
                    (_, true, _) => Status.Planned,
                    (false, false, _) => Status.NotPlanned,
                    (true, false, false) => Status.Learned,
                    (true, false, true) => Status.NotPlanned
                };
        }
    }
}