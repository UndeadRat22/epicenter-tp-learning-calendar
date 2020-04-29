using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Limit
{
    public interface IGetRemainingLimitsForQuarterOperation
    {
        Task<GetRemainingLimitsForQuarterOperationResponse> Execute(GetRemainingLimitsForQuarterOperationRequest request);
    }

    public class GetRemainingLimitsForQuarterOperationRequest
    {
        public int Quarter { get; set; }
    }

    public class GetRemainingLimitsForQuarterOperationResponse
    {
        public int DaysPerQuarter { get; set; }
    }
}