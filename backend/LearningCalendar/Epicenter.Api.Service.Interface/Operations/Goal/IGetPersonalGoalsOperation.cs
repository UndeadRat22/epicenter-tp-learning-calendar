using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Goal
{
    public interface IGetPersonalGoalsOperation
    {
        Task<GetPersonalGoalsOperationResponse> Execute();
    }

    public class GetPersonalGoalsOperationResponse
    {
        public List<PersonalGoal> PersonalGoals { get; set; }

        public class PersonalGoal
        {
            public Guid Id { get; set; }
            public DateTime? CompletionDate { get; set; }
            public Guid TopicId { get; set; }
        }
    }
}