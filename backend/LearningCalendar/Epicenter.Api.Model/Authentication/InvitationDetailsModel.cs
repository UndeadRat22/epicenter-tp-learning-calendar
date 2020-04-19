using System;

namespace Epicenter.Api.Model.Authentication
{
    public class InvitationDetailsModel
    {
        public Guid InvitationId { get; set; }
        public string InvitationFrom { get; set; }
        public string InvitationTo { get; set; }
    }
}