using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic
{
    public interface IGetFullSubordinateTopicTreeOperation
    {
        Task<GetFullSubordinateTopicTreeOperationResponse> Execute();
    }

    public class GetFullSubordinateTopicTreeOperationResponse
    {
        public List<Topic> Roots { get; set; }
        public class Topic
        {
            public List<Topic> Children { get; set; }
            public Guid Id { get; set; }
            public string Subject { get; set; }
            public List<Employee> LearnedEmployees { get; set; }
            public List<Employee> PlannedEmployees { get; set; }
            public List<Employee> NotPlannedEmployees { get; set; }
        }

        public class Employee
        {
            public Guid Id { get; set; }
            public string FullName { get; set; }
        }
    }
}