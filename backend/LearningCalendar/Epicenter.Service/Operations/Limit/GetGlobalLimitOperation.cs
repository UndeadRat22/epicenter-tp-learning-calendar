using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.Limit;

namespace Epicenter.Service.Operations.Limit
{
    public class GetGlobalLimitOperation : Operation, IGetGlobalLimitOperation
    {
        private readonly ILimitRepository _limitRepository;

        public GetGlobalLimitOperation(ILimitRepository limitRepository)
        {
            _limitRepository = limitRepository;
        }
        public async Task<GetGlobalLimitOperationResponse> Execute()
        {
            var globalLimit = await _limitRepository.GetGlobalAsync();
            return new GetGlobalLimitOperationResponse
            {
                DaysPerQuarter = globalLimit.DaysPerQuarter,
                TopicsPerDay = globalLimit.TopicsPerDay
            };
        }
    }
}