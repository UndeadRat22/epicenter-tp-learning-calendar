using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Microsoft.EntityFrameworkCore;

namespace Epicenter.Persistence.Repository.LearningCalendar
{
    public class LimitRepository : Generic.Repository<Limit>, ILimitRepository
    {
        public LimitRepository(EpicenterDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Limit> GetGlobalAsync()
        {
            var globalLimit = (await DbContext
                    .Employees.Include(employee => employee.Limit)
                    .SingleOrDefaultAsync(employee => employee.Team == null))
                .Limit;

            return globalLimit;
        }

        public async Task<Limit> CreateDefaultGlobalLimitAsync()
        {
            var limit = new Limit();
            await CreateAsync(limit);
            return limit;
        }

        public async Task<Limit> GetByEmployeeIdAsync(Guid employeeId)
        {
            return (await DbContext.Employees
                    .Include(employee => employee.Limit)
                    .SingleOrDefaultAsync(employee => employee.Id == employeeId))
                .Limit;
        }

        public async Task<Limit> GetById(Guid id)
        {
            return await DbContext.Limits
                .Include(limit => limit.Employees)
                .SingleOrDefaultAsync(limit => limit.Id == id);
        }
    }
}