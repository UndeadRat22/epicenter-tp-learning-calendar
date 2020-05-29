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
    public class EmployeeRepository : Generic.Repository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(EpicenterDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Employee> GetTopLevelManagerAsync()
        {
            var globalAdmin = await DbContext.Employees
                .Include(employee => employee.Identity)
                .Include(employee => employee.Limit)
                .Include(employee => employee.LearningDays)
                .Include(employee => employee.PersonalGoals)
                .Include(employee => employee.Team)
                .Where(employee => employee.Team == null)
                .SingleOrDefaultAsync();

            return globalAdmin;
        }

        public async Task<Employee> GetByEmailAsync(string email)
        {
            var result = await DbContext.Employees
                .Include(employee => employee.Identity)
                .Include(employee => employee.Limit)
                .Include(employee => employee.LearningDays)
                .Include(employee => employee.PersonalGoals)
                .Include(employee => employee.Team)
                .Where(employee => employee.Identity.Email == email)
                .SingleOrDefaultAsync();
            return result;
        }

        public async Task<Employee> GetByIdAsync(Guid id)
        {
            return await DbContext.Employees
                .Include(employee => employee.Identity)
                .Include(employee => employee.Limit)
                .Include(employee => employee.LearningDays)
                    .ThenInclude(day => day.LearningDayTopics)
                        .ThenInclude(dayTopic => dayTopic.Topic)
                .Include(employee => employee.PersonalGoals)
                    .ThenInclude(goal => goal.Topic)
                .Include(employee => employee.Team)
                .Include(employee => employee.ManagedTeam)
                    .ThenInclude(team => team.Employees)
                .Where(employee => employee.Id == id)
                .SingleOrDefaultAsync();
        }

        public async Task<Employee> GetDetailsAsync(string email)
        {
            return await DbContext.Employees
                .Include(employee => employee.Limit)
                .Include(employee => employee.Identity)
                .Include(employee => employee.Image)
                .Include(employee => employee.PersonalGoals)
                .Include(employee => employee.Team)
                    .ThenInclude(team => team.Employees)
                .Include(employee => employee.ManagedTeam)
                    .ThenInclude(team => team.Employees)
                        .ThenInclude(employee => employee.Limit)
                            .ThenInclude(limit => limit.Employees)
                .Include(employee => employee.LearningDays)
                    .ThenInclude(day => day.LearningDayTopics)
                        .ThenInclude(dayTopic => dayTopic.Topic)
                .Where(employee => employee.Identity.Email == email)
                .SingleOrDefaultAsync();
        }

        public async Task<Employee> GetByIdentityIdAsync(string identityId)
        {
            return await DbContext.Employees
                .Include(employee => employee.Identity)
                .Include(employee => employee.Role)
                .Where(employee => employee.Identity.Id == identityId)
                .SingleOrDefaultAsync();
        }

        public async Task<List<Employee>> GetByTopicIdAsync(Guid topicId)
        {
            var result = await DbContext.Employees
                .Include(employee => employee.Team)
                .ThenInclude(team => team.Manager)
                .Include(employee => employee.LearningDays)
                .ThenInclude(day => day.LearningDayTopics)
                .ThenInclude(dayTopic => dayTopic.Topic)
                .Where(employee =>
                    employee.LearningDays.Any(day =>
                        day.LearningDayTopics.Any(dayTopic => dayTopic.Topic.Id == topicId)))
                .ToListAsync();
            return result;
        }

        public async Task<Employee> GetByLearningDayId(Guid learningDayId)
        {
            return await DbContext.Employees
                .Include(employee => employee.LearningDays)
                    .ThenInclude(day => day.LearningDayTopics)
                        .ThenInclude(dayTopic => dayTopic.Topic)
                .Include(employee => employee.PersonalGoals)
                    .ThenInclude(goal => goal.Topic)
                .SingleAsync(employee => employee.LearningDays.Any(day => day.Id == learningDayId));
        }
    }
}