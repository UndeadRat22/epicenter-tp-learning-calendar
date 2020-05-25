using System;
using Castle.DynamicProxy;
using Epicenter.Domain.Entity.Infrastructure.Logging;
using Epicenter.Infrastructure.Settings;
using Epicenter.Persistence.Interface.Repository.Logging;
using Epicenter.Service.Context.Interface.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace Epicenter.Infrastructure.AOP.Interceptors
{
    public class AutoLogger : IInterceptor
    {
        private readonly ILogRepository _logRepository;
        private readonly IAuthorizationContext _authorizationContext;

        public AutoLogger(
            ILogRepository logRepository, 
            IAuthorizationContext authorizationContext)
        {
            _logRepository = logRepository;
            _authorizationContext = authorizationContext;
        }

        public void Intercept(IInvocation invocation)
        {

            IdentityUser user = _authorizationContext.CurrentIdentity().Result;

            var log = new Log
            {
                Timestamp = DateTime.Now,
                Event = "AutoLog",
                Description = $"{invocation.Method.DeclaringType}.{invocation.Method.Name}",
                UserId = user?.Id
            };
            _logRepository.CreateAsync(log);
            invocation.Proceed();
        }
    }
}