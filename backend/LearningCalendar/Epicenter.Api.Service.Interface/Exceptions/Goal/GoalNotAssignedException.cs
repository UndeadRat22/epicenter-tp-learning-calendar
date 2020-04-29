using System;

namespace Epicenter.Service.Interface.Exceptions.Goal
{
    public class GoalNotAssignedException : ApplicationException
    {
        public GoalNotAssignedException(Guid topicId) : base($"Goal not assigned for topic: {topicId}")
        {
        }
    }
}