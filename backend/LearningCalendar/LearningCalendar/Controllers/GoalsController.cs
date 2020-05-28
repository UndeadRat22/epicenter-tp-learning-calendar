using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading.Tasks;
using Epicenter.Api.Model;
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
        private readonly IGetEmployeeGoalsOperation _getEmployeeGoalsOperation;
        private readonly IAssignGoalToEmployeeOperation _assignGoalToEmployeeOperation;
        private readonly IAssignGoalToTeamOperation _assignGoalToTeamOperation;
        private readonly IAssignGoalsToSelfOperation _assignGoalsToSelfOperation;
        private readonly IDeleteGoalsOperation _deleteGoalsOperation;

        public GoalsController(IGetPersonalGoalsOperation getPersonalGoalsOperation,
            IAssignGoalToEmployeeOperation assignGoalToEmployeeOperation,
            IAssignGoalToTeamOperation assignGoalToTeamOperation, 
            IAssignGoalsToSelfOperation assignGoalsToSelfOperation, 
            IGetEmployeeGoalsOperation getEmployeeGoalsOperation, 
            IDeleteGoalsOperation deleteGoalsOperation)
        {
            _getPersonalGoalsOperation = getPersonalGoalsOperation;
            _assignGoalToEmployeeOperation = assignGoalToEmployeeOperation;
            _assignGoalToTeamOperation = assignGoalToTeamOperation;
            _assignGoalsToSelfOperation = assignGoalsToSelfOperation;
            _getEmployeeGoalsOperation = getEmployeeGoalsOperation;
            _deleteGoalsOperation = deleteGoalsOperation;
        }

        [HttpGet]
        [Route("employee/self")]
        [ProducesResponseType(typeof(PersonalGoalListModel), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPersonalGoals()
        {
            var response = await _getPersonalGoalsOperation.Execute();
            return Ok(new PersonalGoalListModel(response));
        }

        [HttpGet]
        [Route("employee/{id}")]
        [ProducesResponseType(typeof(PersonalGoalListModel), (int) HttpStatusCode.OK)]
        public async Task<IActionResult> GetGoals([Required]Guid id)
        {
            var request = new GetEmployeeGoalsOperationRequest {EmployeeId = id};
            var response =
                await _getEmployeeGoalsOperation.Execute(request);
            return Ok(new PersonalGoalListModel(response));
        }

        [HttpPost]
        [Route("employee")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorModel), (int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> CreateEmployeeGoal(CreateEmployeeGoalsModel model)
        {
            var request = new AssignGoalsToEmployeeOperationRequest
            {
                EmployeeId = model.EmployeeId,
                TopicIds = model.TopicIds
            };
            try
            {
               await _assignGoalToEmployeeOperation.Execute(request);
            }
            catch (GoalAlreadyAssignedException e)
            {
                return BadRequest(new ErrorModel(e.Message));
            }

            return Ok();
        }

        [HttpPost]
        [Route("employee/self")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorModel), (int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> CreateEmployeeGoalSelf(CreateEmployeeGoalsSelfModel model)
        {
            var request = new AssignGoalToSelfOperationRequest
            {
                TopicIds = model.TopicIds
            };
            try
            {
                await _assignGoalsToSelfOperation.Execute(request);
            }
            catch (GoalAlreadyAssignedException e)
            {
                return BadRequest(new ErrorModel(e.Message));
            }
            return Ok();
        }

        [HttpDelete]
        [Route("employee/self")]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteGoals(DeleteGoalsModel model)
        {
            var request = new DeleteGoalsOperationRequest
            {
                TopicIds = model.TopicIds
            };

            await _deleteGoalsOperation.Execute(request);

            return Ok();
        }

        [HttpPost]
        [Route("team")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> CreateTeamGoal(CreateTeamGoalsModel model)
        {
            var request = new AssignGoalToTeamOperationRequest
            {
                TopicIds = model.TopicIds
            };
            await _assignGoalToTeamOperation.Execute(request);
            
            return Ok();
        }
    }
}