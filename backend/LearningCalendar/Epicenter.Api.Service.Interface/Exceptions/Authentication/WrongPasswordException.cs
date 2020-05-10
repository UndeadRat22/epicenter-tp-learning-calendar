using System;

namespace Epicenter.Service.Interface.Exceptions.Authentication
{
    public class WrongPasswordException : ApplicationException
    {
        public WrongPasswordException() : base("Given password was wrong") { }
    }
}