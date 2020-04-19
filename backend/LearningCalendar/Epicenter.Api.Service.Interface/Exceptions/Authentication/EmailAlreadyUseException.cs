using System;

namespace Epicenter.Service.Interface.Exceptions.Authentication
{
    public class EmailAlreadyUseException : ApplicationException
    {
        public EmailAlreadyUseException() : base("Email already in use") { }
    }
}