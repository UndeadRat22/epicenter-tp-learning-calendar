using Epicenter.Domain.Entity.Authentication;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.Authentication;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Persistence.Repository.Authentication;
using Epicenter.Persistence.Repository.Generic;
using Epicenter.Persistence.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.Authentication;
using Epicenter.Service.Interface.Operations.Authentication.Invite;
using Epicenter.Service.Interface.Operations.Authentication.User;
using Epicenter.Service.Interface.Operations.Employee;
using Epicenter.Service.Interface.Operations.Team;
using Epicenter.Service.Interface.Operations.Topic;
using Epicenter.Service.Interface.Services.Mail;
using Epicenter.Service.Operations.Authentication;
using Epicenter.Service.Operations.Authentication.Invite;
using Epicenter.Service.Operations.Authentication.User;
using Epicenter.Service.Operations.Employee;
using Epicenter.Service.Operations.Team;
using Epicenter.Service.Operations.Topic;
using Epicenter.Service.Services.Mail;
using Microsoft.AspNetCore.Identity;
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
            services.AddScoped<ITopicRepository, TopicRepository>();
            
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
            services.AddScoped<IGetDirectSubordinatesOperation, GetDirectSubordinatesOperation>();
            services.AddScoped<IGetAllTopicsOperation, GetAllTopicsOperation>();
            services.AddScoped<ICreateTopicOperation, CreateTopicOperation>();

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
