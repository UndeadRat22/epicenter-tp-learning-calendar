﻿using Epicenter.Domain.Entity;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Persistence.Repository.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Epicenter.IoC
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddTransientRepository<T>(this IServiceCollection services)
            where T : class
        {
            return services.AddTransient<IRepository<T>, Repository<T>>();
        }

        public static IServiceCollection RegisterDependencies(this IServiceCollection services)
        {
            return IoCRegistry.RegisterDependencies(services);
        }

        public static IServiceCollection RegisterDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            return IoCRegistry.RegisterDbContext(services, configuration);
        }
    }
}