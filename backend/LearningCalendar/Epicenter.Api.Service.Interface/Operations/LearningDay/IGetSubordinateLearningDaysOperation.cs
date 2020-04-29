using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;

namespace Epicenter.Service.Interface.Operations.LearningDay
{
    public interface IGetSubordinateLearningDaysOperation
    {
        Task<GetSubordinateLearningDaysOperationResponse> Execute();
    }

    public class GetSubordinateLearningDaysOperationResponse
    {
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