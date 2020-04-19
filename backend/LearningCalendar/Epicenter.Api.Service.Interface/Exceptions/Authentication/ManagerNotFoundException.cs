using System;

namespace Epicenter.Service.Interface.Exceptions.Authentication
{
    public class ManagerNotFoundException : ApplicationException
    {
        public ManagerNotFoundException(Guid id) : base($"Manager: '{id}' was not found.") { }
    }
}