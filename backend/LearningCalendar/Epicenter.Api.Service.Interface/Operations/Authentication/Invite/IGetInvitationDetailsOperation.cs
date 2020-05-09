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

        public class Details
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Role { get; set; }
        }

        public Details InviterDetails { get; set; }
        public Details InviteeDetails { get; set; }
    }
}