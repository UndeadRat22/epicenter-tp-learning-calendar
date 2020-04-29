using System;

namespace Epicenter.Service.Interface.Exceptions.Topic
{
    public class TopicAlreadyLearnedException : ApplicationException
    {
        public TopicAlreadyLearnedException(Guid topicId) : base($"Topic already learned: {topicId}")
        {
        }
    }
}