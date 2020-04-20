using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Employee
{
    public interface IEnsureManagerHasTeamOperation
    {
        Task<EnsureManagerHasTeamResponse> Execute(EnsureManagerHasTeamRequest request);
    }

    public class EnsureManagerHasTeamRequest
    {
        public Guid ManagerId { get; set; }
    }

    public class EnsureManagerHasTeamResponse
    {
        public Guid TeamId { get; set; }
        public Guid ManagerId { get; set; }
        public List<Guid> EmployeeIds { get; set; }
    }
}