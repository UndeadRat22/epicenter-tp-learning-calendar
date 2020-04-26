using System;
using System.Threading.Tasks;
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

        public TopicsController(IGetAllTopicsOperation allTopicsOperation, ICreateTopicOperation topicOperation)
        {
            _getAllTopicsOperation = allTopicsOperation;
            _createTopicOperation = topicOperation;
        }

        [HttpGet]
        public async Task<ActionResult<TopicListModel>> All()
        {
            var response = await _getAllTopicsOperation.Execute();

            return Ok(new TopicListModel(response));
        }

        [HttpPost, Route("topic")]
        public async Task<ActionResult<TopicModel>> CreateTopic(CreateTopicModel model)
        {
            var request = new CreateTopicOperationRequest
            {
                ParentTopic = model.ParentTopic,
                Description = model.Description,
                Subject = model.Subject
            };

            CreateTopicOperationResponse response;
            try
            {
                response = await _createTopicOperation.Execute(request);
            }
            catch (TopicAlreadyExistsException ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(new TopicModel{Id = response.Id});
        }
    }
}