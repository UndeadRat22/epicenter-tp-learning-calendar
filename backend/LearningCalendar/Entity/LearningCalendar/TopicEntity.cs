using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Domain.Entity.LearningCalendar
{
    public class Topic
    {
        public Guid Id { get; set; }
        public Topic ParentTopic { get; set; }
        public Guid? ParentTopicId { get; set; }
        [Required]
        public string Subject { get; set; }
        public string Description { get; set; }
        public List<Topic> SubTopics { get; set; }
        public List<Goal> Goals { get; set; }

        [Timestamp]
        public byte[] RowVersion { get; set; }

        public bool HasParent => ParentTopicId.HasValue;
    }
}