using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Employee
{
    public interface IEmployeeService
    {
        Task<List<EmployeeDto>> GetEmployees();
        Task<EmployeeDto> CreateAsync(string identityId, string managerEmail);
    }
}