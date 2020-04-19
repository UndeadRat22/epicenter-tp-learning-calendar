using System.Threading.Tasks;
using Epicenter.Api.Model.Authentication;
using Epicenter.Service.Interface.Authentication;
using Epicenter.Service.Interface.Authentication.User;
using Epicenter.Service.Interface.Employee;
using Epicenter.Service.Interface.Exceptions.Authentication;
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
        private readonly IEmployeeService _employeeService;
        private readonly IUserService _userService;

        public AuthenticationController(
            IUserService userService,
            IAuthenticationService authenticationService,
            IEmployeeService employeeService)
        {
            _userService = userService;
            _authenticationService = authenticationService;
            _employeeService = employeeService;
        }

        [AllowAnonymous]
        [HttpPost, Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        { 
            var authenticationResult = await _authenticationService.AuthenticateAsync(model.Email, model.Password);

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
            var authenticationResult = await _authenticationService.RegisterAsync(model.InvitationId, model.Password);
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
            UserDto identity;
            try
            {
                identity = await _userService.CreateAsync("test@test.com", "password");
            }
            catch (EmailAlreadyUseException e)
            {
                return Unauthorized(e.Message);
            }

            await _employeeService.CreateAsync(identity.Id, null);
            return Ok();
        }
    }
}