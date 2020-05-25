using System;
using System.Linq;
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
                    .ThenInclude(employee => employee.PersonalGoals)
                .Include(team => team.Manager)
                    .ThenInclude(employee => employee.LearningDays)
                        .ThenInclude(day => day.LearningDayTopics)
                            .ThenInclude(dayTopic => dayTopic.Topic)
                .Include(team => team.Employees)
                    .ThenInclude(employee => employee.Identity)
                .Include(team => team.Employees)
                    .ThenInclude(employee => employee.PersonalGoals)
                        .ThenInclude(goal => goal.Topic)
                .Include(team => team.Employees)
                    .ThenInclude(employee => employee.LearningDays)
                        .ThenInclude(day => day.LearningDayTopics)
                            .ThenInclude(dayTopic => dayTopic.Topic)
                .SingleOrDefaultAsync(team => team.Manager.Id == id);
        }

        public async Task<Team> GetByManagerEmailAsync(string email)
        {
            return await DbContext.Teams
                .Include(team => team.Manager)
                .Include(team => team.Employees)
                .SingleOrDefaultAsync(team => team.Manager.Identity.Email == email);
        }

        public async Task<Team> GetByIdAsync(Guid id)
        {
            return await DbContext.Teams
                .Include(team => team.Manager)
                .Include(team => team.Employees)
                .SingleOrDefaultAsync(team => team.Id == id);
        }

        public async Task<Team> GetTeamTreeAsync(Guid managerId)
        {
            var flatTeams = await DbContext.Teams
                //employee part
                .Include(team => team.Employees)
                    .ThenInclude(employee => employee.LearningDays)
                        .ThenInclude(day => day.LearningDayTopics)
                            .ThenInclude(dayTopic => dayTopic.Topic)
                .Include(team => team.Employees)
                    .ThenInclude(employee => employee.PersonalGoals)
                        .ThenInclude(goal => goal.Topic)
                //manager part
                .Include(team => team.Manager)
                    .ThenInclude(manager => manager.LearningDays)
                        .ThenInclude(day => day.LearningDayTopics)
                            .ThenInclude(dayTopic => dayTopic.Topic)
                .Include(team => team.Manager)
                    .ThenInclude(employee => employee.PersonalGoals)
                        .ThenInclude(goal => goal.Topic)
                .ToListAsync();

            return flatTeams.SingleOrDefault(team => team.Manager.Id == managerId);

        }
    }
}