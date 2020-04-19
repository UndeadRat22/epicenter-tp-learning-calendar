using System;
using System.Collections.Generic;

namespace Epicenter.Service.Interface.Employee
{
    public class TeamDto
    {
        public Guid TeamId { get; set; }
        public Guid ManagerId { get; set; }
        public List<Guid> EmployeeIds { get; set; }
    }
}