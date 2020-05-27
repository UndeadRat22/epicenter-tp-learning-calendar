using System;
using System.Collections.Generic;

namespace Epicenter.Service.Interface.Operations.Topic.Team
{
    public class GetSubordinateTopicTreeOperationResponse
    {
        public List<Topic> Roots { get; set; }
        public class Topic
        {
            public List<Topic> Children { get; set; }
            public Guid Id { get; set; }
            public string Subject { get; set; }
            public string Description { get; set; }
            public List<Employee> LearnedEmployees { get; set; }
            public List<Employee> PlannedEmployees { get; set; }
            public List<Employee> NotPlannedEmployees { get; set; }
            public Status TotalStatus { get; set; }
        }

        public class Employee
        {
            public Guid Id { get; set; }
            public string FullName { get; set; }
        }

        public enum Status
        {
            NotPlanned,
            Planned,
            Learned
        }
    }
}