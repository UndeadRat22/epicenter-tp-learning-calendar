using System;

namespace Epicenter.Service.Interface.Exceptions.Topic
{
    public class TopicNotInLearningDayException : ApplicationException
    {
        public TopicNotInLearningDayException(Guid topicId)
            : base($"Learning day doesn't contain topic: {topicId}")
        {
        }
    }
}