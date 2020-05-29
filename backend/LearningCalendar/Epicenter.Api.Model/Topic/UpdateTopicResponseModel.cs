using System;
using Epicenter.Service.Interface.Operations.Topic;

namespace Epicenter.Api.Model.Topic
{
    public class UpdateTopicResponseModel
    {
        public UpdateTopicResponseModel(UpdateTopicOperationResponse.Topic topic)
        {
            Id = topic.Id;
            Subject = topic.Subject;
            Description = topic.Description;
            ParentTopicId = topic.ParentTopicId;
            ParentTopicSubject = topic.ParentTopicSubject;
        }
        public Guid Id { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public Guid? ParentTopicId { get; set; }
        public string ParentTopicSubject { get; set; }
    }
}