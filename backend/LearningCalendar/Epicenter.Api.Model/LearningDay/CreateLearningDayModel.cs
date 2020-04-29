using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Api.Model.LearningDay
{
    public class CreateLearningDayModel
    {
        [Required]
        public DateTime Date { get; set; }
        public string Comments { get; set; }
        public List<Guid> TopicIds { get; set; }
    }
}