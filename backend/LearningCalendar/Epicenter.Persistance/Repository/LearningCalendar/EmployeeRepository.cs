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
                .Include(employee => employee.PersonalGoals)
                .Include(employee => employee.Team)
                .Where(employee => employee.Id == id)
                .SingleOrDefaultAsync();
        }

        public async Task<Employee> GetDetailsAsync(string email)
        {
            return await DbContext.Employees
                .Include(employee => employee.Identity)
                .Include(employee => employee.Image)
                .Include(employee => employee.Team)
                .Where(employee => employee.Identity.Email == email)
                .SingleOrDefaultAsync();
        }

        public async Task<Employee> GetByIdentityId(string identityId)
        {
            return await DbContext.Employees
                .Include(employee => employee.Identity)
                .Include(employee => employee.Role)
                .Where(employee => employee.Identity.Id == identityId)
                .SingleOrDefaultAsync();
        }
    }
}