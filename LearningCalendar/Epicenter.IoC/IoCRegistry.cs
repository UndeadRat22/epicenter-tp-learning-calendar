using Epicenter.Domain.Entity.Team;
using Epicenter.Service.Employee;
using Epicenter.Service.Interface.Employee;
using Microsoft.Extensions.DependencyInjection;

namespace Epicenter.IoC
{
    public static class IoCRegistry
    {
        public static IServiceCollection RegisterDependencies(IServiceCollection services)
        {
            services.AddScopedRepository<Employee>();
            services.AddScoped<IEmployeeService, EmployeeService>();


            return services;
        }
    }
}
