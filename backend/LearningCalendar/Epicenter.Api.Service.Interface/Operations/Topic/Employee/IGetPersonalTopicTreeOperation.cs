using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic.Employee
{
    public interface IGetPersonalTopicTreeOperation
    {
        Task<GetEmployeeTopicTreeOperationResponse> Execute();
    }
}