using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Service.Interface.Employee;

namespace Epicenter.Service.Employee
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IRepository<Domain.Entity.LearningCalendar.Employee> _employeeRepository;

        public EmployeeService(IRepository<Domain.Entity.LearningCalendar.Employee> employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<List<EmployeeDto>> GetEmployees()
        {
            List<Domain.Entity.LearningCalendar.Employee> employees = await _employeeRepository.ListAsync();

            return employees
                .Select(employee => new EmployeeDto
                {
                }).ToList();
        }
    }
}