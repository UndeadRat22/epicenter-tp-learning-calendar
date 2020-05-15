using Autofac;
using Epicenter.Domain.Entity.Authentication;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Persistence.Repository.Generic;
using Epicenter.Persistence.Repository.LearningCalendar;
using Epicenter.Service.Context.Authorization;
using Epicenter.Service.Operations.Authentication;
using Epicenter.Service.Strategy.Topic;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Epicenter.IoC
{
    public static class IoCRegistry
    {
        public static void RegisterComponents(ContainerBuilder builder)
        {
            RegisterContexts(builder);
            RegisterRepositories(builder);
            RegisterOperations(builder);
            RegisterStrategies(builder);
        }

        private static void RegisterOperations(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(typeof(LoginOperation).Assembly)
                .AsImplementedInterfaces();
        }

        private static void RegisterStrategies(ContainerBuilder builder)
        {
            //TODO config for strategy
            builder.RegisterAssemblyTypes(typeof(EmployeeTopicProgressStatusHasToLearnOnceStrategy).Assembly)
                .AsImplementedInterfaces()
                .InstancePerDependency();
        }

        private static void RegisterRepositories(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(typeof(EmployeeRepository).Assembly)
                .AsImplementedInterfaces()
                .InstancePerDependency();

            builder.RegisterType<Repository<Employee>>().As<IRepository<Employee>>().InstancePerDependency();
            builder.RegisterType<Repository<Invite>>().As<IRepository<Invite>>().InstancePerDependency();
            builder.RegisterType<Repository<Role>>().As<IRepository<Role>>().InstancePerDependency();
            builder.RegisterType<Repository<IdentityUser>>().As<IRepository<IdentityUser>>().InstancePerDependency();
        }

        private static void RegisterContexts(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(typeof(AuthorizationContext).Assembly)
                .AsImplementedInterfaces()
                .InstancePerDependency();
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
