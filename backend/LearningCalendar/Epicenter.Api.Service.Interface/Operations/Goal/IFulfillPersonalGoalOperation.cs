using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Goal
{
    public interface IFulfillPersonalGoalOperation
    {
        Task<FulfillPersonalGoalOperationResponse> Execute(FulfillPersonalGoalOperationRequest request);
    }

    public class FulfillPersonalGoalOperationRequest
    {
        public Guid TopicId { get; set; }
    }

    public class FulfillPersonalGoalOperationResponse
    {
    }
}