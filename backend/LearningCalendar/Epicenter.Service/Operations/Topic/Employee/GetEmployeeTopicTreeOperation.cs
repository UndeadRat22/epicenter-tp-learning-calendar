using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Extensions;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.Topic;
using Epicenter.Service.Interface.Operations.Topic.Employee;
using Epicenter.Service.Strategy.Interface.Topic;

namespace Epicenter.Service.Operations.Topic.Employee
{
    public class GetEmployeeTopicTreeOperation : Operation, IGetEmployeeTopicTreeOperation
    {
        private readonly IEmployeeTopicProgressStatusStrategy _employeeTopicProgressStatusStrategy;
        private readonly ITopicRepository _topicRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public GetEmployeeTopicTreeOperation(
            IEmployeeTopicProgressStatusStrategy employeeTopicProgressStatusStrategy,
            IEmployeeRepository employeeRepository,
            ITopicRepository topicRepository)
        {
            _topicRepository = topicRepository;
            _employeeTopicProgressStatusStrategy = employeeTopicProgressStatusStrategy;
            _employeeRepository = employeeRepository;
        }


        public async Task<GetEmployeeTopicTreeOperationResponse> Execute(GetEmployeeTopicTreeOperationRequest request)
        {
            var rootTopics = await _topicRepository.GetRootTopics();

            var employee = await _employeeRepository.GetByIdAsync(request.EmployeeId);

            var goalTopicIds = employee.PersonalGoals
                .Select(goal => goal.TopicId);

            var topicIds = employee.LearningDays
                .SelectMany(day => day.LearningDayTopics)
                .Select(dayTopic => dayTopic.TopicId)
                .Concat(goalTopicIds)
                .Distinct()
                .ToHashSet();

            var mappedTopics = rootTopics
                .Select(root => MapTopic(root, topicIds, employee))
                .Where(topic => topic != null)
                .ToList();


            return new GetEmployeeTopicTreeOperationResponse
            {
                Roots = mappedTopics
            };
        }

        private GetEmployeeTopicTreeOperationResponse.Topic MapTopic(
            Domain.Entity.LearningCalendar.Topic root,
            HashSet<Guid> inclusiveIds,
            Domain.Entity.LearningCalendar.Employee employee)
        {
            var matchingChild = root.FindAnyOrDefault(parent => parent.SubTopics, child => inclusiveIds.Contains(child.Id));

            GetEmployeeTopicTreeOperationResponse.Topic result;
            
            if (matchingChild != null)
            {
                var children = root.SubTopics
                    .Select(topic => MapTopic(topic, inclusiveIds, employee))
                    .Where(topic => topic != null)
                    .ToList();

                var status = _employeeTopicProgressStatusStrategy.GetStatus(employee, root);

                result = new GetEmployeeTopicTreeOperationResponse.Topic
                {
                    Id = root.Id,
                    ParentId = root.ParentTopicId,
                    Subject = root.Subject,
                    Children = children,
                    Status = ProgressStatusMapper.MapStatus(status)
                };
            }
            else
            {
                result = null;
            }
            return result;
        }
    }
}