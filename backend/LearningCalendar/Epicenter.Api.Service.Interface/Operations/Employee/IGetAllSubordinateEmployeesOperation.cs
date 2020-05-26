using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Employee
{
    public interface IGetAllSubordinateEmployeesOperation
    {
        Task<GetAllSubordinateEmployeesOperationResponse> Execute();
    }

    public class GetAllSubordinateEmployeesOperationResponse
    {
        public List<Employee> Employees { get; set; }
        public class Employee
        {
            public Guid Id { get; set; }
            public string FullName { get; set; }
            public int ManagedEmployeesCount { get; set; }

            public Guid ManagerId { get; set; }
            public string ManagerFullName { get; set; }
        }
    }
}