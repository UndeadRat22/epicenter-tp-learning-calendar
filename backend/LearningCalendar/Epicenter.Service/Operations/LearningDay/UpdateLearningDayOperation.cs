using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Infrastructure.Extensions;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Exceptions.Limit;
using Epicenter.Service.Interface.Operations.LearningDay;

namespace Epicenter.Service.Operations.LearningDay
{
    public class UpdateLearningDayOperation : Operation, IUpdateLearningDayOperation
    {
        private readonly ILearningDayRepository _learningDayRepository;
        private readonly IAuthorizationContext _authorizationContext;
        private readonly IPersonalGoalRepository _goalRepository;

        public UpdateLearningDayOperation(
            ILearningDayRepository learningDayRepository, 
            IAuthorizationContext authorizationContext, 
            IPersonalGoalRepository goalRepository)
        {
            _learningDayRepository = learningDayRepository;
            _authorizationContext = authorizationContext;
            _goalRepository = goalRepository;
        }

        public async Task Execute(UpdateLearningDayOperationRequest request)
        {
            var employee = await _authorizationContext.CurrentEmployee();
            var learningDay = employee.LearningDays
                .FirstOrDefault(day => day.Id == request.LearningDayId)
                    ?? throw new ApplicationException("Learning day not found");

            request.LearningDayTopics ??= new List<UpdateLearningDayOperationRequest.LearningDayTopic>();
            EnsureNoDuplicatedTopics(request);
            EnsureFitsLimits(request, employee);

            if (employee.Id == learningDay.EmployeeId)
            {
                UpdateAllDetails(learningDay, employee, request);
            }
            else
            {
                UpdateComment(learningDay, request);
            }

            await _learningDayRepository.UpdateAsync(learningDay);
            await _goalRepository.UpdateAsync(employee.PersonalGoals);
        }

        private void UpdateAllDetails(
            Domain.Entity.LearningCalendar.LearningDay learningDay, 
            Domain.Entity.LearningCalendar.Employee employee, 
            UpdateLearningDayOperationRequest request)
        {
            List<(UpdateLearningDayOperationRequest.LearningDayTopic requestTopic, LearningDayTopic topic)> nonDeletedTopics = 
                request.LearningDayTopics
                .Select(requestTopic => (requestTopic, learningDay.GetDayTopicByTopicId(requestTopic.TopicId)))
                .ToList();

            var createdTopics = nonDeletedTopics
                .Where(group => group.topic == null)
                .Select(group => CreateDayTopic(employee, group.requestTopic))
                .ToList();

            var topicsToUpdate = nonDeletedTopics
                .Where(group => group.topic != null)
                .ToList();
           
            topicsToUpdate.ForEach(group => UpdateDayTopic(employee, group.requestTopic, group.topic));

            var updatedTopics = topicsToUpdate
                .Select(group => group.topic);

            learningDay.LearningDayTopics = createdTopics
                .Concat(updatedTopics)
                .ToList();

            UpdateComment(learningDay, request);
        }

        private void UpdateComment(
            Domain.Entity.LearningCalendar.LearningDay learningDay,
            UpdateLearningDayOperationRequest request)
        {
            learningDay.Comments = request.Comments;
        }

        private void EnsureNoDuplicatedTopics(UpdateLearningDayOperationRequest request)
        {
            var distinctTopics = request.LearningDayTopics
                .DistinctBy(dayTopic => dayTopic.TopicId)
                .ToList();
            if (distinctTopics.Count != request.LearningDayTopics.Count)
            {
                throw new ApplicationException("Cannot assign multiple instances of the same to topic to a learning day");
            }
        }

        private void EnsureFitsLimits(
            UpdateLearningDayOperationRequest request,
            Domain.Entity.LearningCalendar.Employee employee)
        {
            var limit = employee.Limit;
            if (request.LearningDayTopics.Count > limit.TopicsPerDay)
            {
                throw new LimitExceededException(nameof(Constants.Limit.MaxTopicsPerDay));
            }
        }

        private void UpdateDayTopic(
            Domain.Entity.LearningCalendar.Employee employee,
            UpdateLearningDayOperationRequest.LearningDayTopic requestTopic,
            LearningDayTopic dayTopic)
        {
            var newStatus = MapProgressStatus(requestTopic);

            bool goalsShouldBeCompleted = newStatus != dayTopic.ProgressStatus && newStatus == ProgressStatus.Done;

            if (goalsShouldBeCompleted)
            {
                var targetGoal = employee.PersonalGoals
                    .FirstOrDefault(goal => goal.TopicId == requestTopic.TopicId && !goal.IsComplete);
                targetGoal?.MarkAsComplete();
            }

            dayTopic.ProgressStatus = newStatus;
            dayTopic.TopicId = requestTopic.TopicId;
        }

        private LearningDayTopic CreateDayTopic(
            Domain.Entity.LearningCalendar.Employee employee,
            UpdateLearningDayOperationRequest.LearningDayTopic requestTopic)
        {
            if (requestTopic.ProgressStatus == UpdateLearningDayOperationRequest.ProgressStatus.Done)
            {
                var targetGoal = employee.PersonalGoals
                    .FirstOrDefault(goal => goal.TopicId == requestTopic.TopicId && !goal.IsComplete);

                targetGoal?.MarkAsComplete();
            }
            return new LearningDayTopic
            {
                ProgressStatus = MapProgressStatus(requestTopic),
                TopicId = requestTopic.TopicId
            };
        }

        private ProgressStatus MapProgressStatus(UpdateLearningDayOperationRequest.LearningDayTopic learningDayTopic)
        {
            return learningDayTopic.ProgressStatus switch
            {
                UpdateLearningDayOperationRequest.ProgressStatus.InProgress => ProgressStatus.InProgress,
                UpdateLearningDayOperationRequest.ProgressStatus.Done => ProgressStatus.Done,
                _ => throw new ArgumentOutOfRangeException()
            };
        }
    }
}