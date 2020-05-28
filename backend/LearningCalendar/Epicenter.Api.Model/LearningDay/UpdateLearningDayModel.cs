using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Api.Model.LearningDay
{
    public class UpdateLearningDayModel
    {
        [Required]
        public Guid LearningDayId { get; set; }
        public string Comments { get; set; }

        public List<LearningDayTopic> LearningDayTopics { get; set; }

        public class LearningDayTopic
        {
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
}