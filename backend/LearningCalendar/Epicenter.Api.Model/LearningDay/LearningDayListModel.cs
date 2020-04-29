using Epicenter.Service.Interface.Operations.LearningDay;
using System;
using System.Collections.Generic;
using System.Linq;
using Epicenter.Domain.Entity.LearningCalendar;

namespace Epicenter.Api.Model.LearningDay
{
    public class LearningDayListModel
    {
        public LearningDayListModel(GetLearningDaysOperationResponse response)
        {
            LearningDays = response.LearningDays.Select(learningDay => new LearningDay
            {
                Id = learningDay.Id,
                EmployeeId = learningDay.EmployeeId,
                Date = learningDay.Date,
                Comments = learningDay.Comments,
                Topics = learningDay.Topics.Select(topic => new LearningDay.LearningDayTopic
                {
                    Id = topic.Id,
                    Subject = topic.Subject,
                    ProgressStatus = topic.ProgressStatus
                }).ToList()
            }).ToList();
        }

        public LearningDayListModel(GetSubordinateLearningDaysOperationResponse response)
        {
            LearningDays = response.LearningDays.Select(learningDay => new LearningDay
            {
                Id = learningDay.Id,
                EmployeeId = learningDay.EmployeeId,
                Date = learningDay.Date,
                Comments = learningDay.Comments,
                Topics = learningDay.Topics.Select(topic => new LearningDay.LearningDayTopic
                {
                    Id = topic.Id,
                    Subject = topic.Subject,
                    ProgressStatus = topic.ProgressStatus
                }).ToList()
            }).ToList();
        }

        public List<LearningDay> LearningDays { get; set; }

        public class LearningDay
        {
            public Guid Id { get; set; }
            public Guid EmployeeId { get; set; }
            public DateTime Date { get; set; }
            public string Comments { get; set; }
            public List<LearningDayTopic> Topics { get; set; }

            public class LearningDayTopic
            {
                public Guid Id { get; set; }
                public string Subject { get; set; }
                public ProgressStatus ProgressStatus { get; set; }
            }
        }
    }
}