using System;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Domain.Entity.LearningCalendar
{
    public class Goal
    {
        public Guid Id { get; set; }
        [Required]
        public Topic Topic { get; set; }
        [Required]
        public Guid TopicId { get; set; }
        public DateTime? CompletionDate { get; set; }
    }
}