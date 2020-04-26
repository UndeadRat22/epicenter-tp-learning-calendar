using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Microsoft.AspNetCore.Http;

namespace Epicenter.Service.Context.Authorization
{
    public class AuthorizationContext : IAuthorizationContext
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthorizationContext(IEmployeeRepository employeeRepository, IHttpContextAccessor httpContextAccessor)
        {
            _employeeRepository = employeeRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Employee> Current()
        {
            string email = _httpContextAccessor.HttpContext.User.Identity.Name;

            return await _employeeRepository.GetDetailsAsync(email);
        }

        public string IdentityName => _httpContextAccessor.HttpContext.User.Identity.Name;

    }
}