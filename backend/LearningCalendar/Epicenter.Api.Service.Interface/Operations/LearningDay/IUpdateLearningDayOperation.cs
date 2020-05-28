using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Epicenter.Service.Interface.Operations.Topic;

namespace Epicenter.Service.Interface.Operations.LearningDay
{
    public interface IUpdateLearningDayOperation
    {
        Task Execute(UpdateLearningDayOperationRequest request);
    }

    public class UpdateLearningDayOperationRequest
    {
        public Guid LearningDayId { get; set; }
        public string Comments { get; set; }

        public List<LearningDayTopic> LearningDayTopics { get; set; }

        public class LearningDayTopic
        {
            public Guid TopicId { get; set; }
            public ProgressStatus ProgressStatus { get; set; }
        }

        public enum ProgressStatus
        {
            InProgress,
            Done
        }
    }
}