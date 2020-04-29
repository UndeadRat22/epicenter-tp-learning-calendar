using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.LearningDay
{
    public interface ICreateLearningDayOperation
    {
        public Task<CreateLearningDayOperationResponse> Execute(CreateLearningDayOperationRequest request);
    }

    public class CreateLearningDayOperationRequest
    {
        public DateTime Date { get; set; }
        public string Comments { get; set; }
        public List<Guid> TopicIds { get; set; }
    }

    public class CreateLearningDayOperationResponse
    {
        public Guid Id { get; set; }
    }
}