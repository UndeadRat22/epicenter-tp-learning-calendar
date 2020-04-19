using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Authentication.Invite
{
    public interface IInvitationService
    {
        Task<InvitationDto> GetInvitationAsync(string id);
        Task InviteAsync(string inviterEmail, string inviteeEmail);
    }
}