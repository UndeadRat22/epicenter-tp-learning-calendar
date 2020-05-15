using Epicenter.Domain.Entity.Authentication;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.Authentication;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Persistence.Repository.Authentication;
using Epicenter.Persistence.Repository.Generic;
using Epicenter.Persistence.Repository.LearningCalendar;
using Epicenter.Service.Context.Authorization;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Authentication;
using Epicenter.Service.Interface.Operations.Authentication.Invite;
using Epicenter.Service.Interface.Operations.Authentication.User;
using Epicenter.Service.Interface.Operations.Employee;
using Epicenter.Service.Interface.Operations.Goal;
using Epicenter.Service.Interface.Operations.LearningDay;
using Epicenter.Service.Interface.Operations.Limit;
using Epicenter.Service.Interface.Operations.Team;
using Epicenter.Service.Interface.Operations.Topic;
using Epicenter.Service.Interface.Services.Mail;
using Epicenter.Service.Operations.Authentication;
using Epicenter.Service.Operations.Authentication.Invite;
using Epicenter.Service.Operations.Authentication.User;
using Epicenter.Service.Operations.Employee;
using Epicenter.Service.Operations.Goal;
using Epicenter.Service.Operations.LearningDay;
using Epicenter.Service.Operations.Limit;
using Epicenter.Service.Operations.Team;
using Epicenter.Service.Operations.Topic;
using Epicenter.Service.Services.Mail;
using Epicenter.Service.Strategy.Interface.Topic;
using Epicenter.Service.Strategy.Topic;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Epicenter.IoC
{
    public static class IoCRegistry
    {
        public static IServiceCollection RegisterComponents(IServiceCollection services)
        {
            RegisterRepositories(services);
            RegisterContexts(services);
            RegisterStrategies(services);
            RegisterServices(services);
            RegisterOperations(services);
            return services;
        }

        private static void RegisterOperations(IServiceCollection services)
        {
            services.AddTransient<ILoginOperation, LoginOperation>();
            services.AddTransient<ICreateInvitationOperation, CreateInvitationOperation>();
            services.AddTransient<IGetInvitationDetailsOperation, GetInvitationDetailsOperation>();
            services.AddTransient<ICheckUserCredentialsOperation, CheckUserCredentialsOperation>();
            services.AddTransient<IUserExistsOperation, UserExistsOperation>();
            services.AddTransient<IRegisterUserOperation, RegisterUserOperation>();
            services.AddTransient<ICreateEmployeeOperation, CreateEmployeeOperation>();
            services.AddTransient<IEnsureManagerHasTeamOperation, EnsureManagerHasTeamOperation>();
            services.AddTransient<IGetDirectSubordinatesOperation, GetDirectSubordinatesOperation>();
            services.AddTransient<IGetAllTopicsOperation, GetAllTopicsOperation>();
            services.AddTransient<ICreateTopicOperation, CreateTopicOperation>();
            services.AddTransient<IAssignGoalToEmployeeOperation, AssignGoalToEmployeeOperation>();
            services.AddTransient<IAssignGoalToTeamOperation, AssignGoalToTeamOperation>();
            services.AddTransient<ICreateJwtOperation, CreateJwtOperation>();
            services.AddTransient<IRefreshJwtOperation, RefreshJwtOperation>();
            services.AddTransient<IGetEmployeeDetailsOperation, GetEmployeeDetailsOperation>();
            services.AddTransient<ICreateLearningDayOperation, CreateLearningDayOperation>();
            services.AddTransient<IGetLearningDaysOperation, GetLearningDaysOperation>();
            services.AddTransient<IGetSubordinateLearningDaysOperation, GetSubordinateLearningDaysOperation>();
            services.AddTransient<IGetPersonalGoalsOperation, GetPersonalGoalsOperation>();
            services.AddTransient<IGetLimitsOperation, GetLimitsOperation>();
            services.AddTransient<IGetRemainingLimitsForQuarterOperation, GetRemainingLimitsForQuarterOperation>();
            services.AddTransient<ILearnTopicOperation, LearnTopicOperation>();
            services.AddTransient<IFulfillPersonalGoalOperation, FulfillPersonalGoalOperation>();
            services.AddTransient<IDeleteInvitationsForEmailOperation, DeleteInvitationsForEmailOperation>();
            services.AddTransient<IChangeUserPasswordOperation, ChangeUserPasswordOperation>();
            services.AddTransient<IGetTopicTreeOperation, GetTopicTreeOperation>();
            services.AddTransient<IGetTopicDetailsOperation, GetTopicDetailsOperation>();
            services.AddTransient<IAssignGoalToSelfOperation, AssignGoalToSelfOperation>();
            services.AddTransient<IGetSelfTeamsOperation, GetSelfTeamsOperation>();
        }

        private static void RegisterStrategies(IServiceCollection services)
        {
            //TODO add configuration
            services.AddTransient<IEmployeeTopicProgressStatusStrategy, EmployeeTopicProgressStatusHasToLearnOnceStrategy>();
            services.AddTransient<ITeamTopicProgressStatusStrategy, TeamTopicProgressStatusAllHaveToLearnStrategy>();
        }

        private static void RegisterServices(IServiceCollection services)
        {
            services.AddTransient<IEmailService, EmailService>();
        }

        private static void RegisterRepositories(IServiceCollection services)
        {
            services.AddTransientRepository<Employee>();
            services.AddTransientRepository<Invite>();
            services.AddTransientRepository<Role>();
            services.AddTransient<IRepository<IdentityUser>, Repository<IdentityUser>>();

            services.AddTransient<IInvitationRepository, InvitationRepository>();
            services.AddTransient<IEmployeeRepository, EmployeeRepository>();
            services.AddTransient<ITeamRepository, TeamRepository>();
            services.AddTransient<ILimitRepository, LimitRepository>();
            services.AddTransient<ITopicRepository, TopicRepository>();
            services.AddTransient<IPersonalGoalRepository, PersonalGoalRepository>();
            services.AddTransient<ILearningDayRepository, LearningDayRepository>();
            services.AddTransient<ILearningDayTopicRepository, LearningDayTopicRepository>();
        }

        private static void RegisterContexts(IServiceCollection services)
        {
            services.AddTransient<IAuthorizationContext, AuthorizationContext>();
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
