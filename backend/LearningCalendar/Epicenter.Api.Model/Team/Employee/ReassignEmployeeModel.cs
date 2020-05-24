using System;

namespace Epicenter.Api.Model.Team.Employee
{
    public class ReassignEmployeeModel
    {
        public Guid EmployeeId { get; set; }
        public Guid ManagerId { get; set; }
    }
}