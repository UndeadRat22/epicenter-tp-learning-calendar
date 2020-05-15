using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Extensions;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.Topic;
using Epicenter.Service.Strategy.Interface.Topic;

namespace Epicenter.Service.Operations.Topic
{
    public class GetTopicDetailsOperation : Operation, IGetTopicDetailsOperation
    {
        private readonly IEmployeeTopicProgressStatusStrategy _employeeTopicProgressStatusStrategy;
        private readonly ITeamTopicProgressStatusStrategy _teamTopicProgressStatusStrategy;
        private readonly ITopicRepository _topicRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public GetTopicDetailsOperation(
            IEmployeeTopicProgressStatusStrategy employeeTopicProgressStatusStrategy, 
            ITeamTopicProgressStatusStrategy teamTopicProgressStatusStrategy,
            IEmployeeRepository employeeRepository,
            ITopicRepository topicRepository)
        {
            _employeeTopicProgressStatusStrategy = employeeTopicProgressStatusStrategy;
            _teamTopicProgressStatusStrategy = teamTopicProgressStatusStrategy;
            _employeeRepository = employeeRepository;
            _topicRepository = topicRepository;
        }

        public async Task<GetTopicDetailsOperationResponse> Execute(GetTopicDetailsOperationRequest request)
        {
            var employees = await _employeeRepository.GetByTopicIdAsync(request.TopicId);

            var topic = await _topicRepository.GetByIdAsync(request.TopicId);

            var mappedEmployees = employees.Select(employee => MapEmployee(employee, topic)).ToList();
            var mappedTeams = employees
                .Select(employee => employee.Team)
                .DistinctBy(team => team.Id)
                .Select(team => MapTeam(team, topic))
                .ToList();

            return new GetTopicDetailsOperationResponse
            {
                Id = topic.Id,
                Subject = topic.Subject,
                Description = topic.Description,
                ParentId = topic.ParentTopic?.Id,
                ParentSubject = topic.ParentTopic?.Subject,
                Employees = mappedEmployees,
                Teams = mappedTeams
            };
        }


        private GetTopicDetailsOperationResponse.Employee MapEmployee(Domain.Entity.LearningCalendar.Employee employee, Domain.Entity.LearningCalendar.Topic topic)
        {
            var status = _employeeTopicProgressStatusStrategy.GetStatus(employee, topic);
            return new GetTopicDetailsOperationResponse.Employee
            {
                Id = employee.Id,
                FullName = employee.FullName,
                ProgressStatus = MapStatus(status)
            };
        }

        private GetTopicDetailsOperationResponse.Team MapTeam(Domain.Entity.LearningCalendar.Team team, Domain.Entity.LearningCalendar.Topic topic)
        {
            var status = _teamTopicProgressStatusStrategy.GetStatus(team, topic);
            return new GetTopicDetailsOperationResponse.Team
            {
                TeamId = team.Id,
                ManagerId = team.Manager.Id,
                ManagerFullName = team.Manager.FullName,
                ProgressStatus = MapStatus(status)
            };
        }

        private GetTopicDetailsOperationResponse.ProgressStatus MapStatus(Status status)
        {
            GetTopicDetailsOperationResponse.ProgressStatus result = status switch
            {
                Status.NotLearned => GetTopicDetailsOperationResponse.ProgressStatus.NotLearned,
                Status.Learned => GetTopicDetailsOperationResponse.ProgressStatus.Learned,
                _ => throw new ArgumentOutOfRangeException(nameof(status), status, null)
            };
            return result;
        }
    }
}