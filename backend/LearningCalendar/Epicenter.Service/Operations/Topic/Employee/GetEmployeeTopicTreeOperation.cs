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

            var mappedTopics = rootTopics
                .Select(topic => MapTopic(topic, employee))
                .ToList();

            return new GetEmployeeTopicTreeOperationResponse
            {
                Roots = mappedTopics
            };
        }

        private GetEmployeeTopicTreeOperationResponse.Topic MapTopic(
            Domain.Entity.LearningCalendar.Topic root,
            Domain.Entity.LearningCalendar.Employee employee)
        {
            var children = root.SubTopics
                .Select(topic => MapTopic(topic, employee))
                .ToList();

            var status = _employeeTopicProgressStatusStrategy.GetStatus(employee, root);

            return new GetEmployeeTopicTreeOperationResponse.Topic
            {
                Id = root.Id,
                ParentId = root.ParentTopicId,
                Subject = root.Subject,
                Children = children,
                Status = ProgressStatusMapper.MapStatus(status)
            };
        }
    }
}