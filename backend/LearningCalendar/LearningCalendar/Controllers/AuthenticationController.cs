using System.Threading.Tasks;
using Epicenter.Api.Model.Authentication;
using Epicenter.Service.Interface.Authentication;
using Epicenter.Service.Interface.Authentication.User;
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
        private readonly IUserService _userService;

        public AuthenticationController(
            IUserService userService,
            IAuthenticationService authenticationService)
        {
            _userService = userService;
            _authenticationService = authenticationService;
        }

        [AllowAnonymous]
        [HttpPost, Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        { 
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
            var authenticationResult = await _authenticationService.Register(model.InvitationId, model.Password);

            if (authenticationResult.IsSuccessful)
            {
                return Ok();
            }

            return BadRequest();
        }

        [AllowAnonymous]
        [HttpPost, Route("admin")]
        public async Task<IActionResult> CreateAdmin()
        {
            bool adminAlreadyExists = await _userService.Exists("test@test.com");
            if (adminAlreadyExists)
            {
                return Unauthorized();
            }

            await _userService.Create("test@test.com", "password");
            return Ok();
        }
    }
}