using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading.Tasks;
using Epicenter.Api.Model;
using Epicenter.Api.Model.Team;
using Epicenter.Api.Model.Tree;
using Epicenter.Service.Interface.Exceptions.Team;
using Epicenter.Service.Interface.Operations.Team;
using Epicenter.Service.Interface.Operations.Topic.Team;
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
        private readonly IGetSelfTeamTopicTreeOperation _getSelfTeamTopicTreeOperation;
        private readonly IGetSpecificTeamTopicTreeOperation _getSpecificTeamTopicTreeOperation;
        private readonly IGetFullSubordinateTopicTreeOperation _getFullSubordinateTopicTreeOperation;

        public TeamsController(IGetTeamDetailsOperation teamDetailsOperation,
            IGetSelfTeamsOperation getSelfTeamOperation, 
            IGetSelfTeamTopicTreeOperation getSelfTeamTopicTreeOperation, 
            IGetSpecificTeamTopicTreeOperation getSpecificTeamTopicTreeOperation, 
            IGetFullSubordinateTopicTreeOperation getFullSubordinateTopicTreeOperation)
        {
            _getTeamDetailsOperation = teamDetailsOperation;
            _getSelfTeamOperation = getSelfTeamOperation;
            _getSelfTeamTopicTreeOperation = getSelfTeamTopicTreeOperation;
            _getSpecificTeamTopicTreeOperation = getSpecificTeamTopicTreeOperation;
            _getFullSubordinateTopicTreeOperation = getFullSubordinateTopicTreeOperation;
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

        [HttpGet]
        [Route("team/topics/tree/self")]
        [ProducesResponseType(typeof(TeamTopicTreeModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorModel), (int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetSelfTeamTopicTree()
        {
            GetSubordinateTopicTreeOperationResponse response;
            try
            {
                response = await _getSelfTeamTopicTreeOperation.Execute();
            }
            catch (EmployeeDoesNotManageAnyTeamException ex)
            {
                return NotFound(new ErrorModel(ex.Message));
            }

            return Ok(new TeamTopicTreeModel(response));
        }

        [HttpGet]
        [Route("team/topics/tree/{id}")]
        [ProducesResponseType(typeof(TeamTopicTreeModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorModel), (int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetTeamTopicTree([Required]Guid id)
        {
            var request = new GetSpecificTeamTopicTreeOperationRequest
            {
                EmployeeId = id
            };
            GetSubordinateTopicTreeOperationResponse response;
            try
            {
                response = await _getSpecificTeamTopicTreeOperation.Execute(request);
            }
            catch (EmployeeDoesNotManageAnyTeamException ex)
            {
                return NotFound(new ErrorModel(ex.Message));
            }

            return Ok(new TeamTopicTreeModel(response));
        }

        [HttpGet, Route("topics/tree/self")]
        [ProducesResponseType(typeof(TeamTopicTreeModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorModel), (int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetSubordinateTopicTree()
        {
            GetSubordinateTopicTreeOperationResponse response;

            try
            {
                response = await _getFullSubordinateTopicTreeOperation.Execute();
            }
            catch (EmployeeDoesNotManageAnyTeamException e)
            {
                return NotFound(e.Message);
            }

            return Ok(new TeamTopicTreeModel(response));
        }
    }
}