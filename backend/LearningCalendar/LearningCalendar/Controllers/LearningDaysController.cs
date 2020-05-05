using Epicenter.Api.Model.LearningDay;
using Epicenter.Service.Interface.Operations.LearningDay;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Epicenter.Service.Interface.Exceptions.LearningDay;
using Epicenter.Service.Interface.Exceptions.Limit;

namespace Epicenter.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/learning-days")]
    public class LearningDaysController : ControllerBase
    {
        private readonly IGetLearningDaysOperation _getLearningDaysOperation;
        private readonly IGetSubordinateLearningDaysOperation _getSubordinateLearningDaysOperation;
        private readonly ICreateLearningDayOperation _createLearningDayOperation;

        public LearningDaysController(IGetLearningDaysOperation getLearningDaysOperation,
            IGetSubordinateLearningDaysOperation getSubordinateLearningDaysOperation,
            ICreateLearningDayOperation createLearningDayOperation)
        {
            _getLearningDaysOperation = getLearningDaysOperation;
            _getSubordinateLearningDaysOperation = getSubordinateLearningDaysOperation;
            _createLearningDayOperation = createLearningDayOperation;
        }

        [HttpGet]
        public async Task<ActionResult<LearningDayListModel>> GetLearningDays()
        {
            var response = await _getLearningDaysOperation.Execute();
            return Ok(new LearningDayListModel(response));
        }

        [HttpGet]
        [Route("subordinates")]
        public async Task<ActionResult<LearningDayListModel>> GetSubordinateLearningDays()
        {
            var response = await _getSubordinateLearningDaysOperation.Execute();
            return Ok(new LearningDayListModel(response));
        }

        [HttpPost]
        [Route("learning-day")]
        public async Task<ActionResult<LearningDayModel>> CreateLearningDay(CreateLearningDayModel model)
        {
            var request = new CreateLearningDayOperationRequest
            {
                Date = model.Date,
                Comments = model.Comments,
                TopicIds = model.TopicIds
            };

            CreateLearningDayOperationResponse response;
            try
            {
                response = await _createLearningDayOperation.Execute(request);
            }
            catch (LearningDayAlreadyExistsException ex)
            {
                return Conflict(ex.Message);
            }
            catch (LimitExceededException ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(new LearningDayModel { Id = response.Id } );
        }
    }
}