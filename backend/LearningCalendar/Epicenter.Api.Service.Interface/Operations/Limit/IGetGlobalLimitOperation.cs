using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Limit
{
    public interface IGetGlobalLimitOperation
    {
        Task<GetGlobalLimitOperationResponse> Execute();
    }

    public class GetGlobalLimitOperationResponse
    {
        public int DaysPerQuarter { get; set; }
        public int TopicsPerDay { get; set; }
    }
}