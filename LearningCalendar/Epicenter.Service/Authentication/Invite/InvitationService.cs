using System;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.Authentication;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Service.Interface.Authentication.Invite;
using Epicenter.Service.Interface.Authentication.User;
using Epicenter.Service.Interface.Mail;
using Microsoft.AspNetCore.Identity;

namespace Epicenter.Service.Authentication.Invite
{
    public class InvitationService : IInvitationService
    {
        private readonly IInvitationRepository _invitationRepository;
        private readonly IRepository<IdentityUser> _userRepository;
        private readonly IUserService _userService;
        private readonly IEmailService _emailService;

        public InvitationService(
            IInvitationRepository invitationRepository, 
            IRepository<IdentityUser> userRepository, 
            IUserService userService, 
            IEmailService emailService)
        {
            _invitationRepository = invitationRepository;
            _userRepository = userRepository;
            _userService = userService;
            _emailService = emailService;
        }

        public async Task Invite(string inviterEmail, string inviteeEmail)
        {
            IdentityUser inviter = await _userRepository.QuerySingleAsync(user => user.Email == inviterEmail);

            var inviteId = Guid.NewGuid();

            var invite = new Domain.Entity.Authentication.Invite
            {
                Id = inviteId,
                InvitationTo = inviteeEmail,
                InvitationFrom = inviter,
                Created = DateTime.Now
            };

            var createInviteTask = _invitationRepository.CreateAsync(invite);
            //todo: url + / inviteId
            var sendEmailTask =
                _emailService.SendEmail("Invitation to Epicenter Calender", inviteId.ToString(), inviteeEmail);

            await createInviteTask;
            await sendEmailTask;
        }


        public async Task<InvitationDto> GetInvitation(string id)
        { 
            var guid = Guid.Parse(id);
            var invitation = await _invitationRepository.GetWithInviter(guid);

            return new InvitationDto
            {
                InvitationId = id,
                InviteeEmail = invitation.InvitationTo,
                InviterEmail = invitation.InvitationFrom.Email
            };
        }

    }
}