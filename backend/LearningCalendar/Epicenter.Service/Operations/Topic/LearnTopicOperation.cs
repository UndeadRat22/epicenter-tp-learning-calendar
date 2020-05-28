using System;
using System.Collections.Generic;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.Topic;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Interface.Exceptions;
using Epicenter.Service.Interface.Exceptions.Goal;
using Epicenter.Service.Interface.Exceptions.Topic;
using Epicenter.Service.Interface.Operations.Goal;
using Epicenter.Service.Operations.Goal;
using ProgressStatus = Epicenter.Domain.Entity.LearningCalendar.ProgressStatus;

namespace Epicenter.Service.Operations.Topic
{
    public class LearnTopicOperation : Operation, ILearnTopicOperation
    {
        private readonly IFulfillPersonalGoalOperation _fulfillPersonalGoalOperation;
        private readonly IAssignGoalsToSelfOperation _assignGoalsToSelfOperation;

        public LearnTopicOperation(
            IFulfillPersonalGoalOperation fulfillPersonalGoalOperation, 
            IAssignGoalsToSelfOperation assignGoalsToSelfOperation)
        {
            _fulfillPersonalGoalOperation = fulfillPersonalGoalOperation;
            _assignGoalsToSelfOperation = assignGoalsToSelfOperation;
        }

        public async Task Execute(LearnTopicOperationRequest request)
        {
            var fulfillGoalRequest = new FulfillPersonalGoalOperationRequest
            {
                TopicId = request.TopicId
            };

            try
            {
                await _fulfillPersonalGoalOperation.Execute(fulfillGoalRequest);
            }
            catch (GoalNotAssignedException)
            {
                var assignGoalRequest = new AssignGoalToSelfOperationRequest
                {
                    TopicIds = new List<Guid> { request.TopicId }
                };
                await _assignGoalsToSelfOperation.Execute(assignGoalRequest);
                await _fulfillPersonalGoalOperation.Execute(fulfillGoalRequest);
            }
        }
    }
}