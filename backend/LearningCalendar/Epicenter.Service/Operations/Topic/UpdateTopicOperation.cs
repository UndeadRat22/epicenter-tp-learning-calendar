using System;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Extensions;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Exceptions.Topic;
using Epicenter.Service.Interface.Operations.Topic;
using Microsoft.EntityFrameworkCore;

namespace Epicenter.Service.Operations.Topic
{
    public class UpdateTopicOperation : Operation, IUpdateTopicOperation
    {
        private readonly ITopicRepository _topicRepository;
        private readonly IGetTopicTreeOperation _getTopicTreeOperation;

        public UpdateTopicOperation(ITopicRepository topicRepository, 
            IGetTopicTreeOperation getTopicTreeOperation)
        {
            _topicRepository = topicRepository;
            _getTopicTreeOperation = getTopicTreeOperation;
        }

        public async Task<UpdateTopicOperationResponse> Execute(UpdateTopicOperationRequest request)
        {
            var topic = await _topicRepository.GetByIdAsync(request.NewTopic.Id);

            if (topic == null)
            {
                throw new ApplicationException("Topic not found");
            }

            if (request.NewTopic.ParentTopicId.HasValue)
            {
                await EnsureNewParentIsNotChild(request.NewTopic.Id, request.NewTopic.ParentTopicId.Value);
            }

            bool versionsMatch =
                   topic.Subject == request.OldTopic.Subject 
                && topic.Description == request.OldTopic.Description 
                && topic.ParentTopicId == request.OldTopic.ParentTopicId;

            if (!versionsMatch)
            {
                return new UpdateTopicOperationResponse
                {
                    UpdatedTopic = MapTopic(topic)
                };
            }

            topic.ParentTopicId = request.NewTopic.ParentTopicId;
            topic.Description = request.NewTopic.Description;
            topic.Subject = request.NewTopic.Subject;

            try
            {
                await _topicRepository.UpdateAsync(topic);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                //optimistic locking
                return new UpdateTopicOperationResponse
                {
                    UpdatedTopic = MapTopic(topic)
                };
            }

            return new UpdateTopicOperationResponse();
        }

        private async Task EnsureNewParentIsNotChild(Guid topicToUpdateId, Guid newParent)
        {
            var tree = await _getTopicTreeOperation.Execute();

            GetTopicTreeOperationResponse.Topic topicToUpdate = null;
            foreach (var treeRoot in tree.Roots)
            {
                topicToUpdate = treeRoot
                    .FindAnyOrDefault(
                        root => root.Children, 
                        topic => topic.Id == topicToUpdateId);
                if (topicToUpdate != null)
                {
                    break;
                }
            }
            bool newParentIsChild = topicToUpdate.FindAnyOrDefault(
                root => root.Children, 
                topic => topic.Id == newParent) != null;
            if (newParentIsChild)
            {
                throw new ApplicationException("Cannot assign a child topic as a parent.");
            }
        }

        private UpdateTopicOperationResponse.Topic MapTopic(Domain.Entity.LearningCalendar.Topic topic)
        {
            return new UpdateTopicOperationResponse.Topic
            {
                Id = topic.Id,
                ParentTopicId = topic.ParentTopic?.Id,
                ParentTopicSubject = topic.ParentTopic?.Subject,
                Subject = topic.Subject,
                Description = topic.Description
            };
        }
    }
}