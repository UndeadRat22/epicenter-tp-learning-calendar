using System.Threading.Tasks;
using Epicenter.Api.Model.Authentication;
using Epicenter.Service.Interface.Exceptions.Authentication;
using Epicenter.Service.Interface.Operations.Authentication;
using Epicenter.Service.Interface.Operations.Authentication.User;
using Epicenter.Service.Interface.Operations.Employee;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Epicenter.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ILoginOperation _loginOperation;
        private readonly IRegisterUserOperation _registerUserOperation;
        private readonly ICreateEmployeeOperation _createEmployeeOperation;
        private readonly ICreateJwtOperation _createJwtOperation;

        public AuthenticationController(ILoginOperation loginOperation, IRegisterUserOperation registerUserOperation, ICreateEmployeeOperation employeeOperation, ICreateJwtOperation jwtOperation)
        {
            _loginOperation = loginOperation;
            _registerUserOperation = registerUserOperation;
            _createEmployeeOperation = employeeOperation;
            _createJwtOperation = jwtOperation;
        }

        [AllowAnonymous]
        [HttpPost, Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        { 
            var authenticationResult = await _loginOperation.Execute(new LoginOperationRequest{ Email = model.Email, Password = model.Password });

            if (authenticationResult.IsAuthenticated)
            {
                var tokenModel = new JwtTokenModel
                {
                    Token = authenticationResult.Token, 
                    Expires =  authenticationResult.Expires
                };

                return Ok(tokenModel);
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost, Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var request = new RegisterUserOperationRequest
                {InvitationId = model.InvitationId, Password = model.Password};
            try
            {
                var authenticationResult = await _registerUserOperation.Execute(request);
            }
            catch (EmailAlreadyUseException e)
            {
                return Conflict(e.Message);
            }
            catch
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpGet, Route("refresh")]
        public IActionResult Refresh()
        {
            var request = new CreateJwtOperationRequest
            {
                Email = HttpContext.User.Identity.Name
            };

            var response = _createJwtOperation.Execute(request);

            var model = new JwtTokenModel
            {
                Expires = response.Expires,
                Token = response.Token
            };

            return Ok(model);
        }


        [AllowAnonymous]
        [HttpPost, Route("admin")]
        public async Task<IActionResult> CreateAdmin()
        {
            var request = new CreateEmployeeOperationRequest
            {
                Email = "test@test.com",
                Password = "password",
                ManagerEmail = null
            };
            try
            {
                await _createEmployeeOperation.Execute(request);
            }
            catch
            {
                return Conflict("Admin already created");
            }

            return Ok();
        }
    }
}