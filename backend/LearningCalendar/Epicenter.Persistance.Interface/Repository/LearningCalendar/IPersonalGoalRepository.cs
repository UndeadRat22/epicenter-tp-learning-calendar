using System;
using Epicenter.Domain.Entity.LearningCalendar;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Persistence.Interface.Repository.LearningCalendar
{
    public interface IPersonalGoalRepository : Generic.IRepository<PersonalGoal>
    {
        Task<List<PersonalGoal>> GetByEmployeeIdAsync(Guid employeeId);
    }
}