using System;
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
    }
}