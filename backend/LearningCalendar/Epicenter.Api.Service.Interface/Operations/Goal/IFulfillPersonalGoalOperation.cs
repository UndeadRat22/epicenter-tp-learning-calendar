using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Goal
{
    public interface IFulfillPersonalGoalOperation
    {
        Task Execute(FulfillPersonalGoalOperationRequest request);
    }

    public class FulfillPersonalGoalOperationRequest
    {
        public Guid TopicId { get; set; }
    }
}