using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Team
{
    public interface IGetDirectSubordinatesOperation
    {
        Task<GetDirectSubordinatesOperationResponse> Execute(GetDirectSubordinatesOperationRequest request);
    }

    public class GetDirectSubordinatesOperationRequest
    {
        public Guid ManagerId { get; set; }
    }

    public class GetDirectSubordinatesOperationResponse
    {
        public Guid ManagerId { get; set; }
        public List<Employee> Employees { get; set; }
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