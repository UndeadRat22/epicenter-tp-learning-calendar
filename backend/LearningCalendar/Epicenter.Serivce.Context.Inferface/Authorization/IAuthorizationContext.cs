using System;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Microsoft.AspNetCore.Identity;

namespace Epicenter.Service.Context.Interface.Authorization
{
    public interface IAuthorizationContext
    {
        string IdentityName { get; }
        Task<Employee> CurrentEmployee();
        Task<IdentityUser> CurrentIdentity();
        Task<Team> GetTeamTreeIfAuthorizedForEmployee(Guid id);
        Task<Team> GetTeamTree();
    }
}