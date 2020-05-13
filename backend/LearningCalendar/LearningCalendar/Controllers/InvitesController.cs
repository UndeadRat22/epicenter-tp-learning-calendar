using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading.Tasks;
using Epicenter.Api.Model;
using Epicenter.Api.Model.Authentication;
using Epicenter.Service.Interface.Exceptions.Authentication;
using Epicenter.Service.Interface.Operations.Authentication.Invite;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Extensions;

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
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorModel), (int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> CreateInvite([FromBody] InviteModel model)
        {
            var request = new CreateInvitationOperationRequest
            {
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Role = model.Role
            };

            try
            {
                await _createInvitationOperation.Execute(request);
            }
            catch (EmailAlreadyUseException exception)
            {
                return BadRequest(new ErrorModel(exception.Message));
            }

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet, Route("invite/{id}")]
        public async Task<ActionResult<InvitationDetailsModel>> GetInvite([Required]Guid id)
        {
            var operationResponse =
                await _getInvitationDetailsOperation.Execute(new GetInvitationDetailsOperationRequest {Id = id});

            var model = new InvitationDetailsModel(operationResponse);

            return Ok(model);
        }
    }
}