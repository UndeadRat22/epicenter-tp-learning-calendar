using System;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Api.Model.Topic
{
    public class UpdateTopicModel
    {
        [Required]
        public Guid? ParentTopicId { get; set; }
        [Required]
        public Guid TopicId { get; set; }
        [Required]
        public string Subject { get; set; }
        [Required]
        public string Description { get; set; }
    }
}