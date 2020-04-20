using System;

namespace Epicenter.Service.Interface.Exceptions.Topic
{
    public class TopicAlreadyExistsException : ApplicationException
    {
        public TopicAlreadyExistsException(string subject) 
            : base($"Can't create topic: '{subject}'") {}
    }
}