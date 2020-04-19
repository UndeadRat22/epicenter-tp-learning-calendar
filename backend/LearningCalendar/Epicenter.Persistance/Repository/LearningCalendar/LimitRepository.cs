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
    }
}