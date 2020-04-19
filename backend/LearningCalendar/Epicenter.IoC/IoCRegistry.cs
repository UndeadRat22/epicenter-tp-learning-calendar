using Epicenter.Domain.Entity.Authentication;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.Authentication;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Persistence.Repository.Authentication;
using Epicenter.Persistence.Repository.Generic;
using Epicenter.Persistence.Repository.LearningCalendar;
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
            services.AddScoped<IRepository<IdentityUser>, Repository<IdentityUser>>();

            services.AddScoped<IInvitationRepository, InvitationRepository>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<ITeamRepository, TeamRepository>();
            services.AddScoped<ILimitRepository, LimitRepository>();
            
            services.AddScoped<IEmailService, EmailService>();
            
            //operations
            services.AddScoped<ILoginOperation, LoginOperation>();
            services.AddScoped<ICreateInvitationOperation, CreateInvitationOperation>();
            services.AddScoped<IGetInvitationDetailsOperation, GetInvitationDetailsOperation>();
            services.AddScoped<ICheckUserCredentialsOperation, CheckUserCredentialsOperation>();
            services.AddScoped<IUserExistsOperation, UserExistsOperation>();
            services.AddScoped<IRegisterUserOperation, RegisterUserOperation>();
            services.AddScoped<ICreateEmployeeOperation, CreateEmployeeOperation>();
            services.AddScoped<IEnsureManagerHasTeamOperation, EnsureManagerHasTeamOperation>();

            return services;
        }

        public static IServiceCollection RegisterDbContext(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<EpicenterDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("LocalEpicenterConnection")),
                ServiceLifetime.Transient);

            return services;
        }
    }
}
