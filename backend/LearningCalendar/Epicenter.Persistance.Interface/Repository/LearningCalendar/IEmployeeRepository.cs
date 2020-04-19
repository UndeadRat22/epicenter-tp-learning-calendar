using System;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Interface.Repository.Generic;

namespace Epicenter.Persistence.Interface.Repository.LearningCalendar
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        Task<Employee> GetTopLevelManager();
        Task<Employee> GetByEmail(string email);
        Task<Employee> GetById(Guid id);
    }
}