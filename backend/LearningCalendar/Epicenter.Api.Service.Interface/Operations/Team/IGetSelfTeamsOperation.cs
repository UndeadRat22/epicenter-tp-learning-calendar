using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Team
{
    public interface IGetSelfTeamsOperation
    {
        public Task<GetSelfTeamsOperationResponse> Execute();
    }

    public class GetSelfTeamsOperationResponse
    {
        public Team ManagedTeam { get; set; }
        public Team BelongingToTeam { get; set; }
        public class Team
        {
            public Guid ManagerId { get; set; }
            public List<Employee> Employees { get; set; }

        }
        public class Employee
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
        }
    }
}