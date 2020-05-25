using System;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.Limit;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Extensions;
using Epicenter.Service.Context.Interface.Authorization;

namespace Epicenter.Service.Operations.Limit
{
    public class GetLimitsOperation : Operation, IGetLimitsOperation
    {
        private readonly IAuthorizationContext _authorizationContext;
        private readonly ILimitRepository _limitRepository;
        private readonly IGetRemainingLimitsForQuarterOperation _getRemainingLimitsForQuarterOperation;

        public GetLimitsOperation(IAuthorizationContext authorizationContext,
            ILimitRepository limitRepository,
            IGetRemainingLimitsForQuarterOperation getRemainingLimitsForQuarterOperation)
        {
            _authorizationContext = authorizationContext;
            _limitRepository = limitRepository;
            _getRemainingLimitsForQuarterOperation = getRemainingLimitsForQuarterOperation;
        }

        public async Task<GetLimitsOperationResponse> Execute()
        {
            var employee = await _authorizationContext.CurrentEmployee();
            var limit = await _limitRepository.GetByEmployeeIdAsync(employee.Id);

            var getRemainingLimitsRequest = new GetRemainingLimitsForQuarterOperationRequest
            {
                Quarter = DateTime.Today.GetQuarter()
            };

            var remainingLimit = await _getRemainingLimitsForQuarterOperation.Execute(getRemainingLimitsRequest);

            return new GetLimitsOperationResponse
            {
                Id = limit.Id,
                AssignedLimit = new GetLimitsOperationResponse.Limit
                {
                    DaysPerQuarter = limit.DaysPerQuarter,
                    TopicsPerDay = limit.TopicsPerDay
                },
                RemainingLimit = new GetLimitsOperationResponse.Limit
                {
                    DaysPerQuarter = remainingLimit.DaysPerQuarter,
                    TopicsPerDay = limit.TopicsPerDay
                }
            };
        }
    }
}