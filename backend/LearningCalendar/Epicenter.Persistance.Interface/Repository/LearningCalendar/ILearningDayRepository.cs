using System;
using Epicenter.Domain.Entity.LearningCalendar;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Persistence.Interface.Repository.LearningCalendar
{
    public interface ILearningDayRepository : Generic.IRepository<LearningDay>
    {
        Task<List<LearningDay>> GetByEmployeeIdAsync(Guid employeeId);
        Task<List<LearningDay>> GetByManagerIdAsync(Guid managerId);
    }
}