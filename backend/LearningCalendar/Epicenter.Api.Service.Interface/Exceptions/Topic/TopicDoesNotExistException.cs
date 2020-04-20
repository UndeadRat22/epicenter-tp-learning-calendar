using System;

namespace Epicenter.Service.Interface.Exceptions.Topic
{
    public class TopicDoesNotExistException : ApplicationException
    {
        public TopicDoesNotExistException(Guid id) : base($"Topic: '{id}' does not exist") { }

    }
}