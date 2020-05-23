using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading.Tasks;
using Epicenter.Api.Model.Team;
using Epicenter.Service.Interface.Operations.Team;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Epicenter.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/teams")]
    public class TeamsController : ControllerBase
    {
        private readonly IGetTeamDetailsOperation _getTeamDetailsOperation;
        private readonly IGetSelfTeamsOperation _getSelfTeamOperation;

        public TeamsController(IGetTeamDetailsOperation teamDetailsOperation,
            IGetSelfTeamsOperation getSelfTeamOperation)
        {
            _getTeamDetailsOperation = teamDetailsOperation;
            _getSelfTeamOperation = getSelfTeamOperation;
        }

        [HttpGet]
        [Route("team/{managerId}")]
        public async Task<ActionResult<TeamModel>> GetTeam([Required]Guid managerId)
        {
            var response = await _getTeamDetailsOperation
                .Execute(new GetTeamDetailsOperationRequest {ManagerId = managerId});

            var model = new TeamModel(response);

            return Ok(model);
        }

        [HttpGet]
        [Route("team/self")]
        [ProducesResponseType(typeof(TeamModel), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetSelfTeams()
        {
            var response = await _getSelfTeamOperation.Execute();
            var model = new TeamModel(response);
            
            return Ok(model);
        }
    }
}