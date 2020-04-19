using System;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Microsoft.EntityFrameworkCore;

namespace Epicenter.Persistence.Repository.LearningCalendar
{
    public class TeamRepository : Generic.Repository<Team>, ITeamRepository
    {
        public TeamRepository(EpicenterDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Team> GetByManagerIdAsync(Guid id)
        {
            return await DbContext.Teams
                .Include(team => team.Manager)
                .Include(team => team.Employees)
                .SingleOrDefaultAsync(team => team.Manager.Id == id);
        }
    }
}