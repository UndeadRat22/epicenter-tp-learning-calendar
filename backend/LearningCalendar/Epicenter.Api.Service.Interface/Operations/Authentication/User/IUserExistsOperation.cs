using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Authentication.User
{
    public interface IUserExistsOperation
    {
        Task<bool> Execute(string email);
    }
}