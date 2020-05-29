using System;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Extensions;

namespace Epicenter.Persistence.Repository.LearningCalendar
{
    public class LearningDayRepository : Generic.Repository<LearningDay>, ILearningDayRepository
    {
        public LearningDayRepository(EpicenterDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<LearningDay>> GetByEmployeeIdAsync(Guid employeeId)
        {
            return (await DbContext.Employees
                    .Include(employee => employee.LearningDays)
                    .ThenInclude(learningDay => learningDay.LearningDayTopics)
                    .ThenInclude(learningDayTopic => learningDayTopic.Topic)
                    .SingleOrDefaultAsync(employee => employee.Id == employeeId))
                .LearningDays;
        }

        public async Task<List<LearningDay>> GetByManagerIdAsync(Guid managerId)
        {
            return (await DbContext.Teams
                    .Include(team => team.Employees)
                    .ThenInclude(employee => employee.LearningDays)
                        .ThenInclude(learningDay => learningDay.LearningDayTopics)
                            .ThenInclude(learningDayTopic => learningDayTopic.Topic)
                    .Include(team => team.Manager)
                    .SingleOrDefaultAsync(team => team.Manager.Id == managerId))
                ?.Employees.SelectMany(employee => employee.LearningDays)
                .ToList()
                ?? new List<LearningDay>();
        }

        public async Task<List<LearningDay>> GetByEmployeeIdForQuarterAsync(Guid employeeId, int quarter)
        {
            return (await DbContext.Employees
                    .Include(employee => employee.LearningDays)
                    .SingleOrDefaultAsync(employee => employee.Id == employeeId))
                .LearningDays.Where(learningDay => learningDay.Date.GetQuarter() == quarter)
                .ToList();
        }

        public async Task<LearningDay> GetByIdAsync(Guid id)
        {
            return await DbContext.LearningDays
                .Include(day => day.Employee)
                .Include(day => day.LearningDayTopics)
                .ThenInclude(dayTopic => dayTopic.Topic)
                .SingleOrDefaultAsync(day => day.Id == id);
        }


    }
}
