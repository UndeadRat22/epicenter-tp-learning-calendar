using System;
using Epicenter.Service.Interface.Operations.Authentication.Invite;

namespace Epicenter.Api.Model.Authentication
{
    public class InvitationDetailsModel
    {
        public InvitationDetailsModel(GetInvitationDetailsOperationResponse details)
        {
            InviteId = details.InvitationId;
            InviteeDetails = new PersonDetails
            {
                FirstName = details.InviteeDetails.FirstName,
                LastName = details.InviteeDetails.LastName,
                Email = details.InviteeDetails.Email,
                Role = details.InviteeDetails.Role
            };
            InviterDetails = new PersonDetails
            {
                FirstName = details.InviterDetails.FirstName,
                LastName = details.InviterDetails.LastName,
                Email = details.InviterDetails.Email,
                Role = details.InviterDetails.Role
            };
        }

        public Guid InviteId { get; set; }
        public PersonDetails InviteeDetails { get; set; }
        public PersonDetails InviterDetails { get; set; }

        public class PersonDetails
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Role { get; set; }
        }
    }
}