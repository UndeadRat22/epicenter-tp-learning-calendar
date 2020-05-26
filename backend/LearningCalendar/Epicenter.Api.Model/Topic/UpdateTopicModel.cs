using System;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Api.Model.Topic
{
    public class UpdateTopicModel
    {
        public Topic OldTopic { get; set; }
        public Topic NewTopic { get; set; }
        public class Topic
        {
            public Guid? ParentTopicId { get; set; }
            [Required]
            public Guid TopicId { get; set; }
            [Required]
            public string Subject { get; set; }
            public string Description { get; set; }
        }
    }
}