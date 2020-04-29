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
            var learningDays = new List<LearningDay>();

            foreach (var learningDay in response.LearningDays)
            {
                var topics = learningDay.Topics.Select(topic => new LearningDay.LearningDayTopic
                {
                    Id = topic.Id,
                    Subject = topic.Subject,
                    ProgressStatus = topic.ProgressStatus
                }).ToList();

                learningDays.Add(new LearningDay
                {
                    Id = learningDay.Id,
                    EmployeeId = learningDay.EmployeeId,
                    Date = learningDay.Date,
                    Comments = learningDay.Comments,
                    Topics = topics
                });
            }

            LearningDays = learningDays;
        }

        public LearningDayListModel(GetSubordinateLearningDaysOperationResponse response)
        {
            var learningDays = new List<LearningDay>();

            foreach (var learningDay in response.LearningDays)
            {
                var topics = learningDay.Topics.Select(topic => new LearningDay.LearningDayTopic
                {
                    Id = topic.Id,
                    Subject = topic.Subject,
                    ProgressStatus = topic.ProgressStatus
                }).ToList();

                learningDays.Add(new LearningDay
                {
                    Id = learningDay.Id,
                    EmployeeId = learningDay.EmployeeId,
                    Date = learningDay.Date,
                    Comments = learningDay.Comments,
                    Topics = topics
                });
            }

            LearningDays = learningDays;
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