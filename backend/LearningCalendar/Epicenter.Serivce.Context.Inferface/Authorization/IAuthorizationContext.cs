﻿using System;
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
        Task<Team> GetSubordinateTeamTreeIfAuthorized(Guid id);
        Task<bool> IsAuthorizedForEmployee(Guid employeeId);
        Task<Employee> GetEmployeeIfAuthorizedFor(Guid employeeId);
        Task<Team> GetTeamTree();
    }
}