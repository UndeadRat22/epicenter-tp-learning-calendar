using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading.Tasks;
using Epicenter.Api.Model;
using Epicenter.Api.Model.Topic;
using Epicenter.Service.Interface.Exceptions.Topic;
using Epicenter.Service.Interface.Operations.Topic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Epicenter.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/topics")]
    public class TopicsController : ControllerBase
    {
        private readonly IGetAllTopicsOperation _getAllTopicsOperation;
        private readonly ICreateTopicOperation _createTopicOperation;
        private readonly ILearnTopicOperation _learnTopicOperation;
        private readonly IGetTopicTreeOperation _getTopicTreeOperation;
        private readonly IGetTopicDetailsOperation _getTopicDetailsOperation;

        public TopicsController(IGetAllTopicsOperation allTopicsOperation, 
            ICreateTopicOperation topicOperation, 
            ILearnTopicOperation learnTopicOperation, 
            IGetTopicTreeOperation topicTreeOperation, 
            IGetTopicDetailsOperation getTopicDetailsOperation)
        {
            _getAllTopicsOperation = allTopicsOperation;
            _createTopicOperation = topicOperation;
            _learnTopicOperation = learnTopicOperation;
            _getTopicTreeOperation = topicTreeOperation;
            _getTopicDetailsOperation = getTopicDetailsOperation;
        }

        [HttpGet]
        [ProducesResponseType(typeof(TopicListModel), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> All()
        {
            var response = await _getAllTopicsOperation.Execute();

            return Ok(new TopicListModel(response));
        }

        [HttpGet, Route("topic/{id}")]
        [ProducesResponseType(typeof(TopicModel), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Topic([Required]Guid topicId)
        {
            var request = new GetTopicDetailsOperationRequest
            {
                TopicId = topicId
            };

            var response = await _getTopicDetailsOperation.Execute(request);

            return Ok(new TopicModel(response));
        }

        [HttpGet, Route("tree")]
        //[ProducesResponseType(typeof(TopicTreeModel), (int)HttpStatusCode.OK)] Swagger fails because of recursive definition in model
        public async Task<IActionResult> TopicTree()
        {
            var response = await _getTopicTreeOperation.Execute();

            var model = new TopicTreeModel(response);

            return Ok(model);
        }
        
        [HttpPost, Route("topic")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorModel), (int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> CreateTopic(CreateTopicModel model)
        {
            var request = new CreateTopicOperationRequest
            {
                ParentTopic = model.ParentTopic,
                Description = model.Description,
                Subject = model.Subject
            };

            try
            {
                 await _createTopicOperation.Execute(request);
            }
            catch (TopicAlreadyExistsException ex)
            {
                return BadRequest(new ErrorModel(ex.Message));
            }

            return Ok();
        }

        [HttpPost]
        [Route("learn")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorModel), (int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> LearnTopic(LearnTopicModel model)
        {
            var request = new LearnTopicOperationRequest
            {
                LearningDayId = model.LearningDayId,
                TopicId = model.TopicId
            };

            try
            {
                await _learnTopicOperation.Execute(request);
            }
            catch (TopicNotInLearningDayException ex)
            {
                return BadRequest(new ErrorModel(ex.Message));
            }
            catch (TopicAlreadyLearnedException ex)
            {
                return BadRequest(new ErrorModel(ex.Message));
            }

            return Ok();
        }
    }
}