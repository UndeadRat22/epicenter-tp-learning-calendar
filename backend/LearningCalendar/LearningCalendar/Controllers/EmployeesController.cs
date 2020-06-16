using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading.Tasks;
using Epicenter.Api.Model;
using Epicenter.Api.Model.Authentication;
using Epicenter.Api.Model.Team.Employee;
using Epicenter.Service.Interface.Exceptions.Authentication;
using Epicenter.Service.Interface.Exceptions.Employee;
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
        private readonly IDeleteEmployeeOperation _deleteEmployeeOperation;
        private readonly IReassignEmployeeOperation _reassignEmployeeOperation;
        private readonly IGetAllSubordinateEmployeesOperation _getAllSubordinateEmployeesOperation;

        public EmployeesController(
            ICreateEmployeeOperation employeeOperation, 
            IGetEmployeeDetailsOperation employeeDetailsOperation, 
            IDeleteEmployeeOperation deleteEmployeeOperation, 
            IReassignEmployeeOperation reassignEmployeeOperation, 
            IGetAllSubordinateEmployeesOperation getAllSubordinateEmployeesOperation)
        {
            _createEmployeeOperation = employeeOperation;
            _getEmployeeDetailsOperation = employeeDetailsOperation;
            _deleteEmployeeOperation = deleteEmployeeOperation;
            _reassignEmployeeOperation = reassignEmployeeOperation;
            _getAllSubordinateEmployeesOperation = getAllSubordinateEmployeesOperation;
        }


        //THIS IS FOR TESTING PURPOSES ONLY
        //[AllowAnonymous]
        //[HttpPost, Route("employee")]
        //public async Task<IActionResult> CreateTestEmployee([FromBody] CreateTestEmployeeModel model)
        //{
        //    try
        //    {
        //        var randomName = RandomName();
        //        var firstName = model.FirstName ?? randomName.FirstName;
        //        var lastName = model.LastName ?? randomName.LastName;

        //        var request = new CreateEmployeeOperationRequest
        //        {
        //            Email = $"{firstName.ToLowerInvariant()}.{lastName.ToLowerInvariant()}@epicenter.com", 
        //            Password = model.Password, 
        //            ManagerEmail = model.ManagerEmail,
        //            FirstName = firstName,
        //            LastName = lastName,
        //            ImageData = model.ImageData ?? "",
        //            Role = RandomRole()
        //        };
        //        await _createEmployeeOperation.Execute(request);
        //    }
        //    catch (EmailAlreadyUseException exception)
        //    {
        //        return BadRequest(exception.Message);
        //    }

        //    return Ok();
        //}

        [HttpGet, Route("self")]
        public async Task<ActionResult<EmployeeModel>> GetSelf()
        {
            var details = await _getEmployeeDetailsOperation.Execute();
            var model = new EmployeeModel
            {
                Id = details.Id,
                Email = details.Email,
                FirstName = details.FirstName,
                LastName = details.LastName,
                ImageData = details.ImageData,
                IsTopLevelManager = details.IsTopLevelManager
            };
            return Ok(model);
        }

        [HttpDelete, Route("employee/{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorModel), (int)HttpStatusCode.Conflict)]
        public async Task<IActionResult> DeleteEmployee([Required]Guid id)
        {
            var request = new DeleteEmployeeOperationRequest
            {
                EmployeeId = id
            };
            try
            {
                await _deleteEmployeeOperation.Execute(request);
            }
            catch (EmployeeHasSubordinatesException ex)
            {
                return Conflict(ex.Message);
            }

            return Ok();
        }

        [HttpPut, Route("employee/team")]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorModel),(int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> UpdateEmployee(ReassignEmployeeModel model)
        {
            var request = new ReassignEmployeeOperationRequest
            {
                EmployeeId = model.EmployeeId,
                ManagerId = model.ManagerId
            };
            try
            {
                await _reassignEmployeeOperation.Execute(request);
            }
            catch (ApplicationException ex)
            {
                return BadRequest(new ErrorModel(ex.Message));
            }

            return Ok();
        }

        [HttpGet, Route("subordinates")]
        [ProducesResponseType(typeof(EmployeeListModel), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetSubordinateList()
        {
            var response = await _getAllSubordinateEmployeesOperation.Execute();
            return Ok(new EmployeeListModel(response));
        }

        private (string FirstName, string LastName) RandomName()
        {
            var firstNames = new [] { "Alex", "Chad", "Brad", "Owen", "Matthew", "Peter", "Bob", "Richard", "Leo", "Charlotte", "Amelia", "Ada",  };
            var lastNames = new [] { "Smith", "Johnson", "Williams", "Jones", "Watson", "Davis", "Brown", "White", "Green", "Miller", "Wilson", "Morris", "Jenkins" };

            var rand = new Random((int)DateTime.Now.Ticks);

            var firstName = firstNames[rand.Next(0, firstNames.Length)];
            var lastName = lastNames[rand.Next(0, lastNames.Length)];

            return (firstName, lastName);
        }

        private string RandomRole()
        {
            var roles = new[]
            {
                "Tester", "Developer", "Software Engineer", "Software Developer", "Software Architect", "DevOps",
                "Test Engineer", "Test Engineer"
            };

            return roles[new Random((int) DateTime.Now.Ticks).Next(0, roles.Length)];
        }
    }
}
