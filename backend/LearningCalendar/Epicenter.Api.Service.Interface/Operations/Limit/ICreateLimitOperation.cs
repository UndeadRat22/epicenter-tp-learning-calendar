using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Limit
{
    public interface ICreateLimitOperation
    {
        Task Execute(CreateLimitOperationRequest request);
    }

    public class CreateLimitOperationRequest
    {
        public Guid EmployeeId { get; set; }
        public int DaysPerQuarter { get; set; }
    }
}