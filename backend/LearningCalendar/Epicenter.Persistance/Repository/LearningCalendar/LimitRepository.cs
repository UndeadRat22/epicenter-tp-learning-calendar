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
            Limit globalLimit = await DbContext.Limits
                .Include(limit => limit.Creator)
                .Include(limit => limit.Creator.Team)
                .Where(limit => limit.Creator.Team == null)
                .SingleOrDefaultAsync();

            return globalLimit;
        }
    }
}