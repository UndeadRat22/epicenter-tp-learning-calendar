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
        private readonly IInvitationService _invitationService;

        public InvitationController(IInvitationService invitationService)
        {
            _invitationService = invitationService;
        }

        [HttpPost]
        [Route("invite")]
        public async Task<IActionResult> AddInvitation([FromBody] InviteModel model)
        { 
            var currentUser = (ClaimsIdentity) HttpContext.User.Identity;

            await _invitationService.InviteAsync(currentUser.Name, model.InviteeEmail);

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("invite/{id}")]
        public async Task<IActionResult> GetInvitation([Required]string id)
        {
            var invitation = await _invitationService.GetInvitationAsync(id);

            return Ok(invitation);
        }
    }
}