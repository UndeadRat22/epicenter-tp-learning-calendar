using System;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.Infrastructure.Logging;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.Logging;
using Microsoft.EntityFrameworkCore;

namespace Epicenter.Persistence.Repository.Logging
{
    public class LogRepository : Generic.Repository<Log>, ILogRepository
    {
        public LogRepository(EpicenterDbContext dbContext) : base(dbContext)
        {
        }

        public new async Task CreateAsync(Log log)
        {
            if (log.Id == default)
            {
                log.Id = Guid.NewGuid();
            }

            await DbContext.Logs
                .FromSqlRaw(ParameterizedInsertQuery, log.Id, log.Timestamp, log.Event, log.Description, log.UserId)
                .LoadAsync();
        }

        private const string ParameterizedInsertQuery =
            @"INSERT INTO [dbo].[Logs] (Id, Timestamp, Event, Description, UserId)
            VALUES({0}, {1}, {2}, {3}, {4})";
    }
}