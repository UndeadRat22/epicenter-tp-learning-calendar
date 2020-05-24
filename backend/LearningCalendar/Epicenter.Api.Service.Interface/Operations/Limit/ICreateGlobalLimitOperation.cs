using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Limit
{
    public interface ICreateGlobalLimitOperation
    {
        Task Execute(CreateGlobalLimitOperationRequest request);
    }

    public class CreateGlobalLimitOperationRequest
    {
        public int DaysPerQuarter { get; set; }
    }
}