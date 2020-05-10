using System;
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
    [Route("api/auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ILoginOperation _loginOperation;
        private readonly IRegisterUserOperation _registerUserOperation;
        private readonly ICreateEmployeeOperation _createEmployeeOperation;
        private readonly IRefreshJwtOperation _refreshJwtOperation;

        public AuthenticationController(ILoginOperation loginOperation, IRegisterUserOperation registerUserOperation, ICreateEmployeeOperation employeeOperation, IRefreshJwtOperation refreshJwtOperation)
        {
            _loginOperation = loginOperation;
            _registerUserOperation = registerUserOperation;
            _createEmployeeOperation = employeeOperation;
            _refreshJwtOperation = refreshJwtOperation;
        }

        [AllowAnonymous]
        [HttpPost, Route("login")]
        public async Task<ActionResult<JwtModel>> Login([FromBody] LoginModel model)
        {
            var loginRequest = new LoginOperationRequest
            {
                Email = model.Email, Password = model.Password
            };
            
            var authenticationResult = await _loginOperation.Execute(loginRequest);

            if (authenticationResult.IsAuthenticated)
            {
                var tokenModel = new JwtModel
                {
                    Token = authenticationResult.Token, 
                    Expires =  authenticationResult.Expires
                };

                return Ok(tokenModel);
            }

            return Unauthorized();
        }

        [HttpGet, Route("refresh")]
        public ActionResult<JwtModel> Refresh()
        {
            var response = _refreshJwtOperation.Execute();

            var model = new JwtModel
            {
                Expires = response.Expires,
                Token = response.Token
            };

            return Ok(model);
        }

        [AllowAnonymous]
        [HttpPost, Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var request = new RegisterUserOperationRequest
            {
                InviteId = model.InviteId, 
                Password = model.Password,
                ImageData = model.ImageData
            };
            try
            {
                var response = await _registerUserOperation.Execute(request);
            }
            catch (EmailAlreadyUseException e)
            {
                return Conflict(new { Error = e.Message });
            }
            catch (Exception e)
            {
                return BadRequest();
            }

            return Ok();
        }


        [AllowAnonymous]
        [HttpPost, Route("admin")]
        public async Task<IActionResult> CreateAdmin()
        {
            var request = new CreateEmployeeOperationRequest
            {
                Email = "test@test.com",
                Password = "password",
                ManagerEmail = null,
                FirstName = "Donald",
                LastName = "Trump",
                ImageData = ""
            };
            try
            {
                await _createEmployeeOperation.Execute(request);
            }
            catch
            {
                return Conflict(new {Error = "Admin already created"});
            }

            return Ok();
        }
    }
}