using System.Collections.Generic;
using Epicenter.Domain.Entity.LearningCalendar;

namespace Epicenter.Service.Strategy.Interface.Topic
{
    public interface IEmployeeCollectionTopicProgressStatusStrategy
    {
        EmployeeCollectionStatus GetEmployeeCollectionStatusForTopic(
            IEnumerable<Employee> employees, 
            Domain.Entity.LearningCalendar.Topic topic);
    }

    public class EmployeeCollectionStatus
    {
        public List<Employee> LearnedEmployees { get; set; } = new List<Employee>();
        public List<Employee> PlannedEmployees { get; set; } = new List<Employee>();
        public List<Employee> OtherEmployees { get; set; } = new List<Employee>();
    }
}