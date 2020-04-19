using System;

namespace Epicenter.Service.Interface.Exceptions.Authentication
{
    public class InvitationDoesNotExistException : ApplicationException
    {
        public InvitationDoesNotExistException(Guid invitationId) : base($"Invitation:'{invitationId}' doesn't exist"){ }
    }
}