using System;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.LearningDay;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Extensions;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Exceptions.LearningDay;
using Epicenter.Service.Interface.Exceptions.Limit;
using Epicenter.Service.Interface.Operations.Limit;

namespace Epicenter.Service.Operations.LearningDay
{
    public class CreateLearningDayOperation : ICreateLearningDayOperation
    {
        private readonly IAuthorizationContext _authorizationContext;
        private readonly ILearningDayRepository _learningDayRepository;
        private readonly IGetRemainingLimitsForQuarterOperation _getRemainingLimitsForQuarterOperation;

        public CreateLearningDayOperation(IAuthorizationContext authorizationContext,
            ILearningDayRepository learningDayRepository,
            IGetRemainingLimitsForQuarterOperation getRemainingLimitsForQuarterOperation)
        {
            _authorizationContext = authorizationContext;
            _learningDayRepository = learningDayRepository;
            _getRemainingLimitsForQuarterOperation = getRemainingLimitsForQuarterOperation;
        }

        public async Task<CreateLearningDayOperationResponse> Execute(CreateLearningDayOperationRequest request)
        {
            var employee = await _authorizationContext.Current();
            await ThrowIfInvalidLearningDayAsync(employee.Id, request.Date);

            var learningDayTopics = request.TopicIds?
                .Select(topicId => new Domain.Entity.LearningCalendar.LearningDayTopic
                {
                    TopicId = topicId,
                    ProgressStatus = Domain.Entity.LearningCalendar.ProgressStatus.InProgress
                }).ToList();

            var learningDay = new Domain.Entity.LearningCalendar.LearningDay
            {
                EmployeeId = employee.Id,
                Date = request.Date,
                Comments = request.Comments,
                LearningDayTopics = learningDayTopics
            };

            await _learningDayRepository.CreateAsync(learningDay);

            return new CreateLearningDayOperationResponse
            {
                Id = learningDay.Id
            };
        }

        private async Task ThrowIfInvalidLearningDayAsync(Guid employeeId, DateTime date)
        {
            var getRemainingLimitsRequest = new GetRemainingLimitsForQuarterOperationRequest
            {
                Quarter = date.GetQuarter()
            };

            var remainingLimits = await _getRemainingLimitsForQuarterOperation.Execute(getRemainingLimitsRequest);

            if (remainingLimits.DaysPerQuarter <= 0)
            {
                throw new LimitExceededException(nameof(remainingLimits.DaysPerQuarter));
            }

            if ((await _learningDayRepository.QueryAsync(learningDay =>
                learningDay.EmployeeId == employeeId && learningDay.Date == date)).Any())
            {
                throw new LearningDayAlreadyExistsException(date);
            }
        }
    }
}