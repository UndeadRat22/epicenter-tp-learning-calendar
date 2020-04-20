using System;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Api.Model.Topic
{
    public class CreateTopicModel
    {
        public Guid? ParentTopic { get; set; }
        [Required]
        public string Subject { get; set; }

        public string Description { get; set; }
    }
}