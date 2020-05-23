using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.LearningDay
{
    public interface IDeleteLearningDayOperation
    {
        Task Execute(DeleteLearningDayOperationRequest request);
    }

    public class DeleteLearningDayOperationRequest
    {
        public Guid LearningDayId { get; set; }
    }
}
