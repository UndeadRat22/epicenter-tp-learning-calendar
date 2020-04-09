namespace Epicenter.Service.Interface.Authentication.Invite
{
    public class InvitationDto
    {
        public string InvitationId { get; set; }
        public string InviteeEmail { get; set; }
        public string InviterEmail { get; set; }
    }
}