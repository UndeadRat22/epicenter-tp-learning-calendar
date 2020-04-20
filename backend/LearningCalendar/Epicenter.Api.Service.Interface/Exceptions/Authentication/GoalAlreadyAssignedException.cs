using System;

namespace Epicenter.Service.Interface.Exceptions.Authentication
{
    public class GoalAlreadyAssignedException : ApplicationException
    {
        public GoalAlreadyAssignedException(Guid employee, Guid topic) 
            : base($"Topic '{topic}' is already assigned to '{employee}'") { }
    }
}