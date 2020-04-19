using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Threading.Tasks;
using Epicenter.Api.Model.Authentication;
using Epicenter.Service.Interface.Authentication.Invite;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Epicenter.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class InvitationController : ControllerBase
    {
        private readonly ICreateInvitationOperation _createInvitationOperation;
        private readonly IGetInvitationDetailsOperation _getInvitationDetailsOperation;

        public InvitationController(ICreateInvitationOperation invitationOperation, 
            IGetInvitationDetailsOperation invitationDetailsOperation)
        {
            _createInvitationOperation = invitationOperation;
            _getInvitationDetailsOperation = invitationDetailsOperation;
        }

        [HttpPost]
        [Route("invite")]
        public async Task<IActionResult> AddInvitation([FromBody] InviteModel model)
        { 
            var currentUser = (ClaimsIdentity) HttpContext.User.Identity;

            var request = new CreateInvitationOperationRequest
            {
                InviteeEmail = model.InviteeEmail,
                InviterEmail = currentUser.Name
            };

            await _createInvitationOperation.Execute(request);

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("invite/{id}")]
        public async Task<IActionResult> GetInvitation([Required]Guid id)
        {
            var invitation =
                await _getInvitationDetailsOperation.Execute(new GetInvitationDetailsOperationRequest {Id = id});

            var model = new InvitationDetailsModel
            {
                InvitationFrom = invitation.InvitationFrom, 
                InvitationId = invitation.InvitationId,
                InvitationTo = invitation.InvitationTo
            };

            return Ok(model);
        }
    }
}