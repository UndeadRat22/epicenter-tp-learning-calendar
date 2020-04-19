using System.Collections.Generic;
using System.Threading.Tasks;
using Epicenter.Api.Model.Authentication;
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
    public class EmployeesController : ControllerBase
    {
        private readonly ICreateEmployeeOperation _createEmployeeOperation;

        public EmployeesController(ICreateEmployeeOperation employeeOperation)
        {
            _createEmployeeOperation = employeeOperation;
        }


        //THIS IS FOR TESTING PURPOSES ONLY
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateTestEmployee([FromBody] CreateTestEmployeeModel model)
        {
            try
            {
                var request = new CreateEmployeeOperationRequest
                {
                    Email = model.Email, 
                    Password = model.Password, 
                    ManagerEmail = model.ManagerEmail
                };
                await _createEmployeeOperation.Execute(request);
            }
            catch (EmailAlreadyUseException exception)
            {
                return BadRequest(exception.Message);
            }

            return Ok();
        }
    }
}
