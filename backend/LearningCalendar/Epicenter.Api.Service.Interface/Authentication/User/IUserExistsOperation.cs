using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Authentication.User
{
    public interface IUserExistsOperation
    {
        Task<bool> Execute(string email);
    }
}