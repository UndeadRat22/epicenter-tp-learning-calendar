using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Epicenter.Api.Model.Team;
using Epicenter.Service.Interface.Operations.Team;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Epicenter.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TeamController : ControllerBase
    {
        private readonly IGetDirectSubordinatesOperation _getDirectSubordinatesOperation;

        public TeamController(IGetDirectSubordinatesOperation directSubordinatesOperation)
        {
            _getDirectSubordinatesOperation = directSubordinatesOperation;
        }

        [HttpGet]
        [Route("{managerId}")]
        public async Task<IActionResult> GetTeam([Required]Guid managerId)
        {
            var response = await _getDirectSubordinatesOperation
                .Execute(new GetDirectSubordinatesOperationRequest {ManagerId = managerId});

            var model = new TeamModel(response);

            return Ok(model);
        }
    }
}