using System;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Domain.Entity.LearningCalendar
{
    public class LearningDayTopic
    {
        public Guid Id { get; set; }
        [Required]
        public LearningDay LearningDay { get; set; }
        [Required]
        public Guid LearningDayId { get; set; }
        [Required]
        public Topic Topic { get; set; }
        [Required]
        public Guid TopicId { get; set; }
        [Required]
        public ProgressStatus ProgressStatus { get; set; }
    }
    public enum ProgressStatus
    {
        InProgress,
        Done
    }
}