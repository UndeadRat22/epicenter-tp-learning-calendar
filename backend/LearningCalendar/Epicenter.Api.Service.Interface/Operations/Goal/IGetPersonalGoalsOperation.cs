using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Goal
{
    public interface IGetPersonalGoalsOperation
    {
        Task<GetEmployeeGoalsOperationResponse> Execute();
    }
}