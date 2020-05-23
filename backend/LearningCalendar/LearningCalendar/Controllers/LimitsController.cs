using System.Net;
using Epicenter.Api.Model.Limit;
using Epicenter.Service.Interface.Operations.Limit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Epicenter.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/limits")]
    public class LimitsController : ControllerBase
    {
        private readonly IGetLimitsOperation _getLimitsOperation;
        private readonly ICreateLimitOperation _createLimitOperation;
        private readonly ICreateGlobalLimitOperation _createGlobalLimitOperation;

        public LimitsController(
            IGetLimitsOperation getLimitsOperation, 
            ICreateLimitOperation createLimitOperation, 
            ICreateGlobalLimitOperation createGlobalLimitOperation)
        {
            _getLimitsOperation = getLimitsOperation;
            _createLimitOperation = createLimitOperation;
            _createGlobalLimitOperation = createGlobalLimitOperation;
        }

        [HttpGet]
        public async Task<ActionResult<LimitsModel>> GetLimits()
        {
            var response = await _getLimitsOperation.Execute();
            return Ok(new LimitsModel(response));
        }

        [HttpPost]
        [Route("limit")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> CreateLimit(CreateLimitModel model)
        {
            var request = new CreateLimitOperationRequest
            {
                EmployeeId = model.EmployeeId,
                DaysPerQuarter = model.DaysPerQuarter
            };
            
            await _createLimitOperation.Execute(request);
            
            return Ok();
        }

        [HttpPost]
        [Route("limit/global")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> CreateGlobalLimit(CreateGlobalLimitModel model)
        {
            var request = new CreateGlobalLimitOperationRequest
            {
                DaysPerQuarter = model.DaysPerQuarter
            };

            await _createGlobalLimitOperation.Execute(request);

            return Ok();
        }
    }
}