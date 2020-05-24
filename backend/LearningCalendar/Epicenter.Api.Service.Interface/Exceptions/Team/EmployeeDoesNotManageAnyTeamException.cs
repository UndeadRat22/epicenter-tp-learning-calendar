using System;

namespace Epicenter.Service.Interface.Exceptions.Team
{
    public class EmployeeDoesNotManageAnyTeamException : ApplicationException
    {
        public EmployeeDoesNotManageAnyTeamException(Guid employeeId)
            : base($"Employee '{employeeId}' does not manage a team") {}
    }
}