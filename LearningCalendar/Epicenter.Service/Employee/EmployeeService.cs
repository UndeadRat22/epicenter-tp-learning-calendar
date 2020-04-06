using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.Team;
using Epicenter.Persistence.Interface.Generic;
using Epicenter.Service.Interface.Employee;

namespace Epicenter.Service.Employee
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IRepository<EmployeeEntity> _employeeRepository;

        public EmployeeService(IRepository<EmployeeEntity> employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<List<EmployeeDto>> GetEmployees()
        {
            List<EmployeeEntity> employees = await _employeeRepository.List();

            return employees
                .Select(employee => new EmployeeDto
                {
                    FirstName = employee.FirstName,
                    LastName = employee.LastName
                }).ToList();
        }
    }
}