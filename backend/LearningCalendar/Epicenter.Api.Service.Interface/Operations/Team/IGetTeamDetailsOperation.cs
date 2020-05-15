using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Team
{
    public interface IGetTeamDetailsOperation
    {
        Task<GetTeamDetailsOperationResponse> Execute(GetTeamDetailsOperationRequest request);
    }

    public class GetTeamDetailsOperationRequest
    {
        public Guid ManagerId { get; set; }
    }

    public class GetTeamDetailsOperationResponse
    {
        public Details Team { get; set; }
        public class Details
        {
            public Employee Manager { get; set; }
            public List<Employee> Employees { get; set; }
        }

        public class Employee
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public List<Goal> GoalTopics { get; set; }
        }

        public class Goal
        {
            public Guid TopicId { get; set; }
            public string Topic { get; set; }
        }
    }
}