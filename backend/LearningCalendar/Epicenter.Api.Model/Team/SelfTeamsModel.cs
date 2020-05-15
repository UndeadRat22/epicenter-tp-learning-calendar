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
            ManagedTeam = getSelfTeamsResponse.ManagedTeam == null
                ? null 
                : new TeamModel(getSelfTeamsResponse.ManagedTeam);
            BelongingToTeam = getSelfTeamsResponse.BelongingToTeam == null
                ? null
                : new TeamModel(getSelfTeamsResponse.BelongingToTeam);
        }

        public TeamModel ManagedTeam { get; set; }
        public TeamModel BelongingToTeam { get; set; }
    }
}