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
        private readonly IInvitationService _invitationService;

        public InvitationController(IInvitationService invitationService)
        {
            _invitationService = invitationService;
        }

        [HttpPost]
        [Route("invite")]
        public async Task<IActionResult> AddInvitation([FromBody] InviteModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var currentUser = (ClaimsIdentity) HttpContext.User.Identity;

            await _invitationService.Invite(currentUser.Name, model.InviteeEmail);

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("invite/{id}")]
        public async Task<IActionResult> GetInvitation(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }

            var invitation = await _invitationService.GetInvitation(id);

            return Ok(invitation);
        }
    }
}