using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Epicenter.Api.Model.Authentication;
using Epicenter.Service.Interface.Operations.Authentication.Invite;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Epicenter.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/invites")]
    public class InvitesController : ControllerBase
    {
        private readonly ICreateInvitationOperation _createInvitationOperation;
        private readonly IGetInvitationDetailsOperation _getInvitationDetailsOperation;

        public InvitesController(ICreateInvitationOperation invitationOperation, 
            IGetInvitationDetailsOperation invitationDetailsOperation)
        {
            _createInvitationOperation = invitationOperation;
            _getInvitationDetailsOperation = invitationDetailsOperation;
        }

        [HttpPost, Route("invite")]
        public async Task<ActionResult> CreateInvite([FromBody] InviteModel model)
        {
            var request = new CreateInvitationOperationRequest
            {
                InviteeEmail = model.InviteeEmail,
            };

            await _createInvitationOperation.Execute(request);

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet, Route("invite/{id}")]
        public async Task<ActionResult<InvitationDetailsModel>> GetInvite([Required]Guid id)
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