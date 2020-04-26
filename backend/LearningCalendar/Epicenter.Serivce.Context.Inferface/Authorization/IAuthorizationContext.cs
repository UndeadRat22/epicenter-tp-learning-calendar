using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;

namespace Epicenter.Service.Context.Interface.Authorization
{
    public interface IAuthorizationContext
    {
        Task<Employee> Current();
        string IdentityName { get; }
    }
}