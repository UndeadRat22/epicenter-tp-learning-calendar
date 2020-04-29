using System;

namespace Epicenter.Service.Interface.Exceptions.Limit
{
    public class LimitExceededException : ApplicationException
    {
        public LimitExceededException(string limitName)
            : base($"Limit exceeded: {limitName}")
        {
        }
    }
}