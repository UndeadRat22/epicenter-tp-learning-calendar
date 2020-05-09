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

        public LimitsController(IGetLimitsOperation getLimitsOperation)
        {
            _getLimitsOperation = getLimitsOperation;
        }

        [HttpGet]
        public async Task<ActionResult<LimitsModel>> GetLimits()
        {
            var response = await _getLimitsOperation.Execute();
            return Ok(new LimitsModel(response));
        }
    }
}