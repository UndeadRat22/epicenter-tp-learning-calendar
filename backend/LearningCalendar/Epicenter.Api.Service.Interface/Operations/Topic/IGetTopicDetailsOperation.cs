using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic
{
    public interface IGetTopicDetailsOperation
    {
        Task<GetTopicDetailsOperationResponse> Execute(GetTopicDetailsOperationRequest request);
    }

    public class GetTopicDetailsOperationRequest
    {
        public Guid TopicId { get; set; }
    }

    public class GetTopicDetailsOperationResponse
    {
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public string ParentSubject { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public List<Employee> Employees  { get; set; }
        public List<Team> Teams { get; set; }

        public class Employee
        {
            public Guid Id { get; set; }
            public string FullName { get; set; }
            public ProgressStatus ProgressStatus { get; set; }
        }

        public class Team
        {
            public Guid ManagerId { get; set; }
            public Guid TeamId { get; set; }
            public string ManagerFullName { get; set; }
            public ProgressStatus ProgressStatus { get; set; }
            public int EmployeeCount { get; set; }
            public int EmployeeWhoLearnedCount { get; set; }
        }
    }
}