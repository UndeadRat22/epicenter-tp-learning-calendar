using System;
using System.Threading.Tasks;
using Epicenter.Api.Model.Authentication;
using Epicenter.Api.Model.Team;
using Epicenter.Api.Model.Team.Employee;
using Epicenter.Service.Interface.Exceptions.Authentication;
using Epicenter.Service.Interface.Operations.Employee;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Epicenter.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/employees")]
    public class EmployeesController : ControllerBase
    {
        private readonly ICreateEmployeeOperation _createEmployeeOperation;
        private readonly IGetEmployeeDetailsOperation _getEmployeeDetailsOperation;

        public EmployeesController(ICreateEmployeeOperation employeeOperation, 
            IGetEmployeeDetailsOperation employeeDetailsOperation)
        {
            _createEmployeeOperation = employeeOperation;
            _getEmployeeDetailsOperation = employeeDetailsOperation;
        }


        //THIS IS FOR TESTING PURPOSES ONLY
        [AllowAnonymous]
        [HttpPost, Route("employee")]
        public async Task<IActionResult> CreateTestEmployee([FromBody] CreateTestEmployeeModel model)
        {
            try
            {
                var randomName = RandomName();
                var request = new CreateEmployeeOperationRequest
                {
                    Email = model.Email, 
                    Password = model.Password, 
                    ManagerEmail = model.ManagerEmail,
                    FirstName = model.FirstName ?? randomName.FirstName,
                    LastName = model.LastName ?? randomName.LastName,
                    ImageData = model.ImageData ?? "",
                };
                await _createEmployeeOperation.Execute(request);
            }
            catch (EmailAlreadyUseException exception)
            {
                return BadRequest(exception.Message);
            }

            return Ok();
        }

        //TODO
        //[HttpGet] - should return employee by Id: api/employees/{id}
        //[HttpGet] - should return all* employees  api/employees

        [HttpGet, Route("self")]
        public async Task<ActionResult<EmployeeModel>> GetEmployee()
        {
            var details = await _getEmployeeDetailsOperation.Execute();
            var model = new EmployeeModel
            {
                Email = details.Email,
                FirstName = details.FirstName,
                LastName = details.LastName,
                ImageData = details.ImageData,
                IsTopLevelManager = details.IsTopLevelManager
            };
            return Ok(model);
        }


        private (string FirstName, string LastName) RandomName()
        {
            var firstNames = new [] { "john", "aaron", "abdul", "abe", "abel", "abraham", "adam", "adan", "adolfo", "adolph", "adrian", "abby", "abigail", "adele", "adrian" };
            var lastNames = new [] { "smith", "abbott", "acosta", "adams", "adkins", "aguilar" };

            var rand = new Random((int)DateTime.Now.Ticks);

            var firstName = firstNames[rand.Next(0, firstNames.Length)];
            var lastName = lastNames[rand.Next(0, lastNames.Length)];

            return (firstName, lastName);
        }
    }
}
