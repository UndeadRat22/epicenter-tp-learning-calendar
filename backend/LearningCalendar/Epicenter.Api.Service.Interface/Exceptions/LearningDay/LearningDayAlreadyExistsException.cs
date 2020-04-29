using System;

namespace Epicenter.Service.Interface.Exceptions.LearningDay
{
    public class LearningDayAlreadyExistsException : ApplicationException
    {
        public LearningDayAlreadyExistsException(DateTime date)
            : base($"Learning day already exists: {date.ToShortDateString()}")
        {
        }
    }
}