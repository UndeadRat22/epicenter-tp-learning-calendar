using System;
using System.Collections.Generic;
using System.Linq;
using Epicenter.Service.Interface.Operations.Team;

namespace Epicenter.Api.Model.Team
{
    public class SelfTeamsModel
    {
        public SelfTeamsModel(GetSelfTeamsOperationResponse getSelfTeamsResponse)
        {
            ManagedTeam = MapTeam(getSelfTeamsResponse.ManagedTeam);
            BelongingToTeam = MapTeam(getSelfTeamsResponse.BelongingToTeam);
        }

        private SelfTeamsTeam MapTeam(GetSelfTeamsOperationResponse.Team team)
        {
            if (team == null)
            {
                return null;
            }

            return new SelfTeamsTeam
            {
                ManagerId = team.ManagerId,
                Employees = team.Employees.Select(employee => new SelfTeamsEmployee
                {
                    Id = employee.Id,
                    Name = employee.Name
                }).ToList()
            };
        }

        public SelfTeamsTeam ManagedTeam { get; set; }
        public SelfTeamsTeam BelongingToTeam { get; set; }
        public class SelfTeamsTeam
        {
            public Guid ManagerId { get; set; }
            public List<SelfTeamsEmployee> Employees { get; set; }
        }

        public class SelfTeamsEmployee
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
        }
    }
}