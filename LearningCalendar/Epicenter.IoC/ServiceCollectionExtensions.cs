using Epicenter.Domain.Entity;
using Epicenter.Persistence.Generic;
using Epicenter.Persistence.Interface.Generic;
using Microsoft.Extensions.DependencyInjection;

namespace Epicenter.IoC
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddScopedRepository<T>(this IServiceCollection services)
            where T : class, IEntity
        {
            return services.AddScoped<IRepository<T>, Repository<T>>();
        }
    }
}