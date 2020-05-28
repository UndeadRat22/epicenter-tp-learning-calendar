using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Interface.Repository.Generic;

namespace Epicenter.Persistence.Interface.Repository.LearningCalendar
{
    public interface ILimitRepository : IRepository<Limit>
    {
        Task<Limit> GetGlobalAsync();
        Task<Limit> CreateDefaultGlobalLimitAsync();
        Task<Limit> GetByEmployeeIdAsync(Guid employeeId);
        Task<Limit> GetById(Guid id);
        Task<List<Limit>> GetNonAssignedLimitsAsync();
    }
}