using System;
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

        public async Task<Employee> GetTopLevelManager()
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

        public async Task<Employee> GetByEmail(string email)
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

        public async Task<Employee> GetById(Guid id)
        {
            return await DbContext.Employees
                .Include(employee => employee.Identity)
                .Include(employee => employee.Limit)
                .Include(employee => employee.LearningDays)
                .Include(employee => employee.PersonalGoals)
                .Include(employee => employee.Team)
                .Where(employee => employee.Id == id)
                .SingleOrDefaultAsync();
        }
    }
}