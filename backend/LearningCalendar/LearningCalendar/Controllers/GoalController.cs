using System.Threading.Tasks;
using Epicenter.Api.Model.Goal;
using Epicenter.Service.Interface.Exceptions.Authentication;
using Epicenter.Service.Interface.Operations.Goal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Epicenter.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class GoalController : ControllerBase
    {
        private readonly IAssignGoalToEmployeeOperation _assignGoalToEmployeeOperation;
        private readonly IAssignGoalToTeamOperation _assignGoalToTeamOperation;

        public GoalController(IAssignGoalToEmployeeOperation assignGoalToEmployeeOperation, 
            IAssignGoalToTeamOperation assignGoalToTeamOperation)
        {
            _assignGoalToEmployeeOperation = assignGoalToEmployeeOperation;
            _assignGoalToTeamOperation = assignGoalToTeamOperation;
        }

        [HttpPost]
        [Route("employee")]
        public async Task<IActionResult> CreateEmployeeGoal(CreateEmployeeGoalModel model)
        {
            var request = new AssignGoalToEmployeeOperationRequest
            {
                EmployeeId = model.EmployeeId,
                TopicId = model.TopicId
            };
            try
            {
                var response = await _assignGoalToEmployeeOperation.Execute(request);
            }
            catch (GoalAlreadyAssignedException e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
        }

        [HttpPost]
        [Route("team")]
        public async Task<IActionResult> CreateTeamGoal(CreateTeamGoalModel model)
        {
            var request = new AssignGoalToTeamOperationRequest
            {
                ManagerId = model.ManagerId,
                TopicId = model.TopicId
            };
            await _assignGoalToTeamOperation.Execute(request);
            
            return Ok();
        }
    }
}