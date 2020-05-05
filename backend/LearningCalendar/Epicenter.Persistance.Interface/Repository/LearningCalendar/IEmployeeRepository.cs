using System;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Interface.Repository.Generic;

namespace Epicenter.Persistence.Interface.Repository.LearningCalendar
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        Task<Employee> GetTopLevelManagerAsync();
        Task<Employee> GetByEmailAsync(string email);
        Task<Employee> GetByIdAsync(Guid id);
        Task<Employee> GetDetailsAsync(string email);
        Task<Employee> GetByIdentityId(string identityId);
    }
}