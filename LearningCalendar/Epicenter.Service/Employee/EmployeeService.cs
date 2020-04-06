using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.Team;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Service.Interface.Employee;

namespace Epicenter.Service.Employee
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IRepository<Domain.Entity.Team.Employee> _employeeRepository;

        public EmployeeService(IRepository<Domain.Entity.Team.Employee> employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<List<EmployeeDto>> GetEmployees()
        {
            List<Domain.Entity.Team.Employee> employees = await _employeeRepository.List();

            return employees
                .Select(employee => new EmployeeDto
                {
                    FirstName = employee.FirstName,
                    LastName = employee.LastName
                }).ToList();
        }
    }
}