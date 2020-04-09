using System.Threading.Tasks;
using Epicenter.Api.Model.Authentication;
using Epicenter.Service.Interface.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Epicenter.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [AllowAnonymous]
        [HttpPost, Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var authenticationResult = await _authenticationService.Authenticate(model.Email, model.Password);

            if (authenticationResult.IsAuthenticated)
            {
                var tokenModel = new JwtTokenModel {Token = authenticationResult.Token};
                return Ok(tokenModel);
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost, Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var authenticationResult = await _authenticationService.CreateAuthIdentity(model.Email);

            if (authenticationResult.IsSuccessful)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}