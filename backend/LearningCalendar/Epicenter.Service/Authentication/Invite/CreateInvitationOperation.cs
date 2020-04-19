using System;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.Authentication;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Service.Interface.Authentication.Invite;
using Epicenter.Service.Interface.Mail;
using Microsoft.AspNetCore.Identity;

namespace Epicenter.Service.Authentication.Invite
{
    public class CreateInvitationOperation : ICreateInvitationOperation
    {
        private readonly IRepository<IdentityUser> _userRepository;
        private readonly IEmailService _emailService;
        private readonly IInvitationRepository _invitationRepository;

        public CreateInvitationOperation(IRepository<IdentityUser> userRepository, IEmailService emailService, IInvitationRepository invitationRepository)
        {
            _userRepository = userRepository;
            _emailService = emailService;
            _invitationRepository = invitationRepository;
        }

        public async Task<CreateInvitationOperationResponse> Execute(CreateInvitationOperationRequest request)
        {
            IdentityUser inviter = await _userRepository.QuerySingleAsync(user => user.Email == request.InviterEmail);

            var invite = new Domain.Entity.Authentication.Invite
            {
                Id = Guid.NewGuid(),
                InvitationTo = request.InviteeEmail,
                InvitationFrom = inviter,
                Created = DateTime.Now
            };

            var createInviteTask = _invitationRepository.CreateAsync(invite);
            //todo: url + / inviteId
            var sendEmailTask =
                _emailService.SendEmailAsync("Invitation to Epicenter Calender", invite.Id.ToString(), invite.InvitationTo);

            await createInviteTask;
            await sendEmailTask;

            return new CreateInvitationOperationResponse();
        }
    }
}