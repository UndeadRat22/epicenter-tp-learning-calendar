using System;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Persistence.Repository.LearningCalendar
{
    public class PersonalGoalRepository : Generic.Repository<PersonalGoal>, IPersonalGoalRepository
    {
        public PersonalGoalRepository(EpicenterDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<PersonalGoal>> GetByEmployeeIdAsync(Guid employeeId)
        {
            return (await DbContext.Employees
                    .Include(employee => employee.PersonalGoals)
                    .ThenInclude(goal => goal.Topic)
                    .SingleOrDefaultAsync(employee => employee.Id == employeeId))
                .PersonalGoals;
        }
    }
}