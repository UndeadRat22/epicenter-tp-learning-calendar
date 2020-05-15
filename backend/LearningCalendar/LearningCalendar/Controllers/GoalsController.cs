using System.Net;
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
    [Route("api/personal-goals")]
    public class GoalsController : ControllerBase
    {
        private readonly IGetPersonalGoalsOperation _getPersonalGoalsOperation;
        private readonly IAssignGoalToEmployeeOperation _assignGoalToEmployeeOperation;
        private readonly IAssignGoalToTeamOperation _assignGoalToTeamOperation;
        private readonly IAssignGoalToSelfOperation _assignGoalToSelfOperation;

        public GoalsController(IGetPersonalGoalsOperation getPersonalGoalsOperation,
            IAssignGoalToEmployeeOperation assignGoalToEmployeeOperation,
            IAssignGoalToTeamOperation assignGoalToTeamOperation, 
            IAssignGoalToSelfOperation assignGoalToSelfOperation)
        {
            _getPersonalGoalsOperation = getPersonalGoalsOperation;
            _assignGoalToEmployeeOperation = assignGoalToEmployeeOperation;
            _assignGoalToTeamOperation = assignGoalToTeamOperation;
            _assignGoalToSelfOperation = assignGoalToSelfOperation;
        }

        [HttpGet]
        public async Task<ActionResult<PersonalGoalListModel>> GetPersonalGoals()
        {
            var response = await _getPersonalGoalsOperation.Execute();
            return Ok(new PersonalGoalListModel(response));
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
        [Route("employee/self")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> CreateEmployeeGoalSelf(CreateEmployeeGoalSelfModel model)
        {
            var request = new AssignGoalToSelfOperationRequest
            {
                TopicId = model.TopicId
            }; 
            await _assignGoalToSelfOperation.Execute(request);
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