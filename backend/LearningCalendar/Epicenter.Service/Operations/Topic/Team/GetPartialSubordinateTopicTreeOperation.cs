using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Exceptions.Team;
using Epicenter.Service.Interface.Operations.Topic.Team;
using Epicenter.Service.Strategy.Interface.Topic;

namespace Epicenter.Service.Operations.Topic.Team
{
    public class GetPartialSubordinateTopicTreeOperation : Operation, IGetPartialSubordinateTopicTreeOperation
    {
        private readonly ITopicRepository _topicRepository;
        private readonly IAuthorizationContext _authorizationContext;
        private readonly IEmployeeCollectionTopicProgressStatusStrategy _employeeCollectionTopicProgressStatusStrategy;

        public GetPartialSubordinateTopicTreeOperation(
            ITopicRepository topicRepository, 
            IAuthorizationContext authorizationContext, 
            IEmployeeCollectionTopicProgressStatusStrategy employeeCollectionTopicProgressStatusStrategy)
        {
            _topicRepository = topicRepository;
            _authorizationContext = authorizationContext;
            _employeeCollectionTopicProgressStatusStrategy = employeeCollectionTopicProgressStatusStrategy;
        }

        public async Task<GetSubordinateTopicTreeOperationResponse> Execute(GetPartialSubordinateTopicTreeOperationRequest request)
        {
            var topics = await _topicRepository.GetRootTopics();
            var teamTree = await _authorizationContext.GetTeamTree();
            var manager = await _authorizationContext.CurrentEmployee();
            if (teamTree == null)
            {
                throw new EmployeeDoesNotManageAnyTeamException(manager.Id);
            }
            var employees = teamTree.GetAllEmployees();
            
            if (request.EmployeeIds.Any())
            {
                employees = employees
                    .Where(employee => request.EmployeeIds.Contains(employee.Id))
                    .ToList();
            }

            return new GetSubordinateTopicTreeOperationResponse
            {
                Roots = topics
                    .Select(topic => MapToResponse(topic, employees))
                    .ToList()
            };
        }

        private GetSubordinateTopicTreeOperationResponse.Topic MapToResponse(
            Domain.Entity.LearningCalendar.Topic topic,
            List<Domain.Entity.LearningCalendar.Employee> employees)
        {
            var status = _employeeCollectionTopicProgressStatusStrategy.GetStatus(employees, topic);

            return new GetSubordinateTopicTreeOperationResponse.Topic
            {
                Id = topic.Id,
                Subject = topic.Subject,
                Description = topic.Description,
                Children = topic.SubTopics.Select(subTopic => MapToResponse(subTopic, employees)).ToList(),
                PlannedEmployees = status.PlannedEmployees.Select(MapEmployee).ToList(),
                LearnedEmployees = status.LearnedEmployees.Select(MapEmployee).ToList(),
                NotPlannedEmployees = status.OtherEmployees.Select(MapEmployee).ToList(),
                TotalStatus = MapStatus(status)
            };
        }

        private GetSubordinateTopicTreeOperationResponse.Employee MapEmployee(Domain.Entity.LearningCalendar.Employee employee)
        {
            return new GetSubordinateTopicTreeOperationResponse.Employee
            {
                FullName = employee.FullName,
                Id = employee.Id
            };
        }

        private GetSubordinateTopicTreeOperationResponse.Status MapStatus(EmployeeCollectionStatus status)
        {
            GetSubordinateTopicTreeOperationResponse.Status mappedStatus = status.TotalStatus switch
            {
                Status.NotPlanned => GetSubordinateTopicTreeOperationResponse.Status.NotPlanned,
                Status.Planned => GetSubordinateTopicTreeOperationResponse.Status.Planned,
                Status.Learned => GetSubordinateTopicTreeOperationResponse.Status.Learned,
                _ => throw new ArgumentOutOfRangeException()
            };
            return mappedStatus;
        }
    }
}