using System;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.LearningDay;
using Microsoft.EntityFrameworkCore.Internal;

namespace Epicenter.Service.Operations.LearningDay
{
    public class DeleteLearningDayOperation : Operation, IDeleteLearningDayOperation
    {
        private readonly IAuthorizationContext _authorizationContext;
        private readonly ILearningDayRepository _learningDayRepository;

        public DeleteLearningDayOperation(IAuthorizationContext authorizationContext, 
            ILearningDayRepository learningDayRepository)
        {
            _authorizationContext = authorizationContext;
            _learningDayRepository = learningDayRepository;
        }

        public async Task Execute(DeleteLearningDayOperationRequest request)
        {
            var employee = await _authorizationContext.CurrentEmployee();
            var learningDay = employee.LearningDays.FirstOrDefault(day => day.Id == request.LearningDayId);
            if (learningDay == null)
            {
                throw new ApplicationException($"Not authorized for learning day: '{request.LearningDayId}'.");
            }

            await _learningDayRepository.DeleteAsync(learningDay);
        }
    }
}