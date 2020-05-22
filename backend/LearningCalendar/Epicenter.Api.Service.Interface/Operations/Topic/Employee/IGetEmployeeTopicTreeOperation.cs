using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic.Employee
{

    public interface IGetEmployeeTopicTreeOperation
    {
        Task<GetEmployeeTopicTreeOperationResponse> Execute(GetEmployeeTopicTreeOperationRequest request);
    }

    public class GetEmployeeTopicTreeOperationResponse
    {
        public List<Topic> Roots { get; set; }
        public class Topic
        {
            public List<Topic> Children { get; set; }
            public Guid Id { get; set; }
            public string Subject { get; set; }
            public Guid? ParentId { get; set; }
            public ProgressStatus Status { get; set; }
        }
    }

    public class GetEmployeeTopicTreeOperationRequest
    {
        public Guid EmployeeId { get; set; }
    }
}