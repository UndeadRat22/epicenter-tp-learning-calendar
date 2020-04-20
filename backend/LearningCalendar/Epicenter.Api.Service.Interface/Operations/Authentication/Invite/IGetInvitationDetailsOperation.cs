using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Authentication.Invite
{
    public interface IGetInvitationDetailsOperation
    {
        Task<GetInvitationDetailsOperationResponse> Execute(GetInvitationDetailsOperationRequest request);
    }

    public class GetInvitationDetailsOperationRequest
    {
        public Guid Id { get; set; }
    }

    public class GetInvitationDetailsOperationResponse
    {
        public Guid InvitationId { get; set; }
        public string InvitationTo { get; set; }
        public string InvitationFrom { get; set; }
    }
}