using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading.Tasks;
using Epicenter.Api.Model;
using Epicenter.Api.Model.Topic;
using Epicenter.Api.Model.Tree;
using Epicenter.Service.Interface.Exceptions.Topic;
using Epicenter.Service.Interface.Operations.Topic;
using Epicenter.Service.Interface.Operations.Topic.Employee;
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
        private readonly IUpdateTopicOperation _updateTopicOperation;
        private readonly ILearnTopicOperation _learnTopicOperation;
        private readonly IGetTopicTreeOperation _getTopicTreeOperation;
        private readonly IGetTopicDetailsOperation _getTopicDetailsOperation;
        private readonly IGetEmployeeTopicTreeOperation _getEmployeeTopicTreeOperation;
        private readonly IGetPersonalTopicTreeOperation _getPersonalTopicTreeOperation;
        private readonly IGetSelfLearnedTopicsOperation _getSelfLearnedTopicsOperation;

        public TopicsController(IGetAllTopicsOperation allTopicsOperation, 
            ICreateTopicOperation topicOperation, 
            ILearnTopicOperation learnTopicOperation, 
            IGetTopicTreeOperation topicTreeOperation, 
            IGetTopicDetailsOperation getTopicDetailsOperation, 
            IGetEmployeeTopicTreeOperation getEmployeeTopicTreeOperation, 
            IGetPersonalTopicTreeOperation getPersonalTopicTreeOperation,
            IUpdateTopicOperation updateTopicOperation, 
            IGetSelfLearnedTopicsOperation getSelfLearnedTopicsOperation)
        {
            _getAllTopicsOperation = allTopicsOperation;
            _createTopicOperation = topicOperation;
            _learnTopicOperation = learnTopicOperation;
            _getTopicTreeOperation = topicTreeOperation;
            _getTopicDetailsOperation = getTopicDetailsOperation;
            _getEmployeeTopicTreeOperation = getEmployeeTopicTreeOperation;
            _getPersonalTopicTreeOperation = getPersonalTopicTreeOperation;
            _updateTopicOperation = updateTopicOperation;
            _getSelfLearnedTopicsOperation = getSelfLearnedTopicsOperation;
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
        [ProducesResponseType(typeof(ErrorModel), (int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> Topic([Required]Guid id)
        {
            var request = new GetTopicDetailsOperationRequest
            {
                TopicId = id
            };
            GetTopicDetailsOperationResponse response;
            try
            {
                response = await _getTopicDetailsOperation.Execute(request);
            }
            catch
            {
                return NotFound(new ErrorModel($"No topic '{id}' exists"));
            }
            return Ok(new TopicModel(response));
        }

        [HttpGet, Route("employee/self")]
        [ProducesResponseType(typeof(EmployeeTopicTreeModel), (int) HttpStatusCode.OK)]
        public async Task<IActionResult> PersonalTopicTree()
        {
            var response = await _getPersonalTopicTreeOperation.Execute();
            
            return Ok(new EmployeeTopicTreeModel(response));
        }

        [HttpGet, Route("employee/{id}")]
        [ProducesResponseType(typeof(EmployeeTopicTreeModel), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> PersonalTopicTree([Required]Guid id)
        {
            var request = new GetEmployeeTopicTreeOperationRequest
            {
                EmployeeId = id
            };

            var response = await _getEmployeeTopicTreeOperation.Execute(request);

            return Ok(new EmployeeTopicTreeModel(response));
        }

        [HttpGet, Route("tree")]
        [ProducesResponseType(typeof(TopicTreeModel), (int)HttpStatusCode.OK)]
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

        [HttpPut, Route("topic")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorModel), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(UpdateTopicResponseModel), (int)HttpStatusCode.Conflict)]
        public async Task<IActionResult> UpdateTopic(UpdateTopicModel model)
        {
            var updateRequest = new UpdateTopicOperationRequest
            {
                NewTopic = new UpdateTopicOperationRequest.Topic
                {
                    Id = model.NewTopic.TopicId,
                    ParentTopicId = model.NewTopic.ParentTopicId,
                    Description = model.NewTopic.Description,
                    Subject = model.NewTopic.Subject
                },
                OldTopic = new UpdateTopicOperationRequest.Topic
                {
                    Id = model.OldTopic.TopicId,
                    ParentTopicId = model.OldTopic.ParentTopicId,
                    Description = model.OldTopic.Description,
                    Subject = model.OldTopic.Subject
                },
            };
            UpdateTopicOperationResponse response;
            try
            {
                response = await _updateTopicOperation.Execute(updateRequest);
            }
            catch (ApplicationException ex)
            {
                return BadRequest(new ErrorModel(ex.Message));
            }

            if (response.UpdatedTopic != null)
            {
                return Conflict(new UpdateTopicResponseModel(response.UpdatedTopic));
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

        [HttpGet]
        [Route("learned/self")]
        [ProducesResponseType(typeof(TopicListModel), (int) HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorModel), (int) HttpStatusCode.BadRequest)]
        public async Task<IActionResult> GetLearnedTopicsSelf()
        {
            var response = await _getSelfLearnedTopicsOperation.Execute();
            return Ok(new TopicListModel(response));
        }
    }
}