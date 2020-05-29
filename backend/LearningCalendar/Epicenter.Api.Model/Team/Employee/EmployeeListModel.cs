using System;
using System.Collections.Generic;
using System.Linq;
using Epicenter.Service.Interface.Operations.Employee;

namespace Epicenter.Api.Model.Team.Employee
{
    public class EmployeeListModel
    {
        public EmployeeListModel(GetAllSubordinateEmployeesOperationResponse response)
        {
            Employees = response.Employees
                .Select(employee => new Employee
                {
                    Id = employee.Id,
                    FullName = employee.FullName,
                    ManagerId = employee.ManagerId,
                    ManagerFullName = employee.ManagerFullName,
                    ManagedEmployeesCount = employee.ManagedEmployeesCount,
                    SubordinateIds = employee.SubordinateIds
                })
                .ToList();
        }

        public List<Employee> Employees { get; set; }
        public class Employee
        {
            public Guid Id { get; set; }
            public string FullName { get; set; }
            public int ManagedEmployeesCount { get; set; }

            public Guid ManagerId { get; set; }
            public string ManagerFullName { get; set; }

            public List<Guid> SubordinateIds { get; set; }
        }
    }
}