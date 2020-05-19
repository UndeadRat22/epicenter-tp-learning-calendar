using System;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Microsoft.AspNetCore.Identity;

namespace Epicenter.Service.Context.Interface.Authorization
{
    public interface IAuthorizationContext
    {
        Task<Employee> CurrentEmployee();
        Task<IdentityUser> CurrentIdentity();
        Task<Employee> GetEmployeeTreeIfAuthorizedFor(Guid id);
        string IdentityName { get; }
    }
}