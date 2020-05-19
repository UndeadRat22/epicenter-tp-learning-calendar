using System;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Infrastructure.Extensions;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Epicenter.Service.Context.Authorization
{
    public class AuthorizationContext : IAuthorizationContext
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IRepository<IdentityUser> _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthorizationContext(IEmployeeRepository employeeRepository, IRepository<IdentityUser> userRepository,
            IHttpContextAccessor httpContextAccessor)
        {
            _employeeRepository = employeeRepository;
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Employee> CurrentEmployee()
        {
            string email = IdentityName;

            return await _employeeRepository.GetDetailsAsync(email);
        }

        public async Task<IdentityUser> CurrentIdentity()
        {
            string email = IdentityName;

            return await _userRepository.QuerySingleOrDefaultAsync(user => user.Email == email);
        }

        public async Task<Employee> GetEmployeeTreeIfAuthorizedFor(Guid employeeId)
        {
            var employee = await CurrentEmployee();
            employee = await _employeeRepository.GetWithSubordinateTree(employee.Id);

            var selectedEmployee = employee.FindAnyOrDefault(root => root.Team.Employees, child => child.Id == employeeId);

            if (selectedEmployee == null)
            {
                throw new ApplicationException($"Employee ({employee.Id}) is not authorized to view ({employeeId}).");
            }

            return selectedEmployee;
        }

        public string IdentityName => _httpContextAccessor.HttpContext.User.Identity.Name;
    }
}