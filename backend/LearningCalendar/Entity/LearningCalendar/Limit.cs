using System;
using System.Collections.Generic;

namespace Epicenter.Domain.Entity.LearningCalendar
{
    public class Limit
    {
        public Guid Id { get; set; }
        public List<Employee> Employees { get; set; }
        public Employee Creator { get; set; }
        public int DaysPerQuarter { get; set; }
        public int TopicsPerDay { get; set; }
    }
}
