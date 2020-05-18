using System;
using System.Reflection;
using Autofac;
using Autofac.Extras.DynamicProxy;
using Castle.Core.Logging;
using Castle.DynamicProxy;
using Epicenter.Domain.Entity.Infrastructure.Authentication;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Infrastructure.AOP.Attributes;
using Epicenter.Infrastructure.AOP.Interceptors;
using Epicenter.Infrastructure.Extensions;
using Epicenter.Infrastructure.Settings;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Persistence.Repository.Generic;
using Epicenter.Persistence.Repository.LearningCalendar;
using Epicenter.Service.Context.Authorization;
using Epicenter.Service.Operations;
using Epicenter.Service.Strategy.Topic;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Epicenter.Infrastructure.IoC
{
    public static class IoCRegistry
    {
        public static void RegisterComponents(ContainerBuilder builder, LoggingSettings settings)
        {
            RegisterAOPComponents(builder);
            RegisterLoggedComponents(builder, settings);
            RegisterRepositories(builder);
            RegisterStrategies(builder);
        }

        private static void RegisterAOPComponents(ContainerBuilder builder)
        {
            builder.RegisterType<AutoLogger>().InstancePerDependency();
        }

        private static void RegisterLoggedComponents(ContainerBuilder builder, LoggingSettings settings)
        {
            var assemblies = new[]
            {
                typeof(Operation).Assembly,
                typeof(AuthorizationContext).Assembly
            };

            builder.RegisterAssemblyTypes(assemblies)
                .AsImplementedInterfaces()
                .InstancePerDependency();
            if (settings.Enabled)
            {
                RegisterInterceptorForAttribute<AutoLogAttribute, AutoLogger>(builder, assemblies);
            }
        }

        private static void RegisterInterceptorForAttribute<TAttribute, TInterceptor>(ContainerBuilder builder, params Assembly[] assemblies)
            where TAttribute : Attribute
            where TInterceptor : IInterceptor
        {
            builder.RegisterAssemblyTypes(assemblies)
                .AsImplementedInterfaces()
                .Where(type => type.HasAttribute<TAttribute>())
                .EnableInterfaceInterceptors()
                .InterceptedBy(typeof(TInterceptor))
                .InstancePerDependency();
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

        public static IServiceCollection RegisterDbContext(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<EpicenterDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("LocalEpicenterConnection")),
                ServiceLifetime.Transient);

            return services;
        }
    }
}
