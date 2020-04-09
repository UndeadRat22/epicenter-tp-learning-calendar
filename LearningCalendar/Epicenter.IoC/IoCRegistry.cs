using Epicenter.Domain.Entity.Authentication;
using Epicenter.Domain.Entity.Team;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.Authentication;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Persistence.Repository.Authentication;
using Epicenter.Persistence.Repository.Generic;
using Epicenter.Service.Authentication;
using Epicenter.Service.Authentication.Invite;
using Epicenter.Service.Authentication.User;
using Epicenter.Service.Employee;
using Epicenter.Service.Interface.Authentication;
using Epicenter.Service.Interface.Authentication.Invite;
using Epicenter.Service.Interface.Authentication.User;
using Epicenter.Service.Interface.Employee;
using Epicenter.Service.Interface.Mail;
using Epicenter.Service.Mail;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
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

            services.AddScopedRepository<Invite>();
            services.AddScoped<IInvitationRepository, InvitationRepository>();
            
            services.AddScoped<IRepository<IdentityUser>, Repository<IdentityUser>>();
            
            
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IInvitationService, InvitationService>();

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
