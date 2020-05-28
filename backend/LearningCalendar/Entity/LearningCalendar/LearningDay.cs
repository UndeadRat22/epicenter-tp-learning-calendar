using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Epicenter.Domain.Entity.LearningCalendar
{
    public class LearningDay
    {
        public Guid Id { get; set; }
        [Required]
        public Employee Employee { get; set; }
        [Required]
        public Guid EmployeeId { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public string Comments { get; set; }
        public List<LearningDayTopic> LearningDayTopics { get; set; }

        public LearningDayTopic GetDayTopicByTopicId(Guid topicId)
        {
            return LearningDayTopics.FirstOrDefault(dayTopic => dayTopic.TopicId == topicId);
        }
    }
}