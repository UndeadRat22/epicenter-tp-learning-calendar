using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Goal
{
    public interface IGetEmployeeGoalsOperation
    {
        Task<GetEmployeeGoalsOperationResponse> Execute(GetEmployeeGoalsOperationRequest request);
    }

    public class GetEmployeeGoalsOperationRequest
    {
        public Guid EmployeeId { get; set; }
    }

    public class GetEmployeeGoalsOperationResponse
    {
        public List<PersonalGoal> PersonalGoals { get; set; }

        public class PersonalGoal
        {
            public Guid Id { get; set; }
            public DateTime? CompletionDate { get; set; }
            public Topic Topic { get; set; }
            public bool IsCompleted => CompletionDate.HasValue;
        }

        public class Topic
        {
            public Guid Id { get; set; }
            public string Subject { get; set; }
            public string Description { get; set; }
        }
    }
}