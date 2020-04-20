using System;

namespace Epicenter.Persistence.Interface.Exceptions
{
    public abstract class PersistenceException : Exception
    {
        protected PersistenceException(string message) : base(message) { }
    }
}