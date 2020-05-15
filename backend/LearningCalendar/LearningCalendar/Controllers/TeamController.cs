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
    public class TeamController : ControllerBase
    {
        private readonly IGetDirectSubordinatesOperation _getDirectSubordinatesOperation;
        private readonly IGetSelfTeamsOperation _getSelfTeamsOperation;

        public TeamController(IGetDirectSubordinatesOperation directSubordinatesOperation,
            IGetSelfTeamsOperation getSelfTeamsOperation)
        {
            _getDirectSubordinatesOperation = directSubordinatesOperation;
            _getSelfTeamsOperation = getSelfTeamsOperation;
        }

        [HttpGet]
        [Route("team/{managerId}")]
        public async Task<ActionResult<TeamModel>> GetTeam([Required]Guid managerId)
        {
            var response = await _getDirectSubordinatesOperation
                .Execute(new GetDirectSubordinatesOperationRequest {ManagerId = managerId});

            var model = new TeamModel(response);

            return Ok(model);
        }

        [HttpGet]
        [Route("team/self")]
        [ProducesResponseType(typeof(SelfTeamsModel), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetSelfTeams()
        {
            var getSelfTeamsResponse = await _getSelfTeamsOperation.Execute();
            var model = new SelfTeamsModel(getSelfTeamsResponse);
            
            return Ok(model);
        }
    }
}