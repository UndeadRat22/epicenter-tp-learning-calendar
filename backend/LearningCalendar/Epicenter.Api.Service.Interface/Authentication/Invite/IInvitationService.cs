using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Authentication.Invite
{
    public interface IInvitationService
    {
        Task<InvitationDto> GetInvitation(string id);
        Task Invite(string inviterEmail, string inviteeEmail);
    }
}