using Epicenter.Domain.Entity.Team;
using Epicenter.Persistence.Context;
using Epicenter.Service.Employee;
using Epicenter.Service.Interface.Employee;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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

        public static IServiceCollection RegisterDbContext(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<EpicenterDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("LocalEpicenterConnection")));

            return services;
        }
    }
}
