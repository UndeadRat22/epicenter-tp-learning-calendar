using Epicenter.Domain.Entity.Infrastructure.Logging;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.Logging;

namespace Epicenter.Persistence.Repository.Logging
{
    public class LogRepository : Generic.Repository<Log>, ILogRepository
    {
        public LogRepository(EpicenterDbContext dbContext) : base(dbContext)
        {
        }
    }
}