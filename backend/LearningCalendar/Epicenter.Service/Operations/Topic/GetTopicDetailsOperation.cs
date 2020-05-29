using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Extensions;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Topic;
using Epicenter.Service.Strategy.Interface.Topic;

namespace Epicenter.Service.Operations.Topic
{
    public class GetTopicDetailsOperation : Operation, IGetTopicDetailsOperation
    {
        private readonly IEmployeeCollectionTopicProgressStatusStrategy _employeeCollectionTopicProgressStatusStrategy;
        private readonly IEmployeeTopicProgressStatusStrategy _employeeTopicProgressStatusStrategy;
        private readonly IAuthorizationContext _authorizationContext;
        private readonly ITopicRepository _topicRepository;

        public GetTopicDetailsOperation(
            IEmployeeCollectionTopicProgressStatusStrategy employeeCollectionTopicProgressStatusStrategy, 
            IEmployeeTopicProgressStatusStrategy employeeTopicProgressStatusStrategy, 
            IAuthorizationContext authorizationContext, 
            ITopicRepository topicRepository)
        {
            _employeeCollectionTopicProgressStatusStrategy = employeeCollectionTopicProgressStatusStrategy;
            _employeeTopicProgressStatusStrategy = employeeTopicProgressStatusStrategy;
            _authorizationContext = authorizationContext;
            _topicRepository = topicRepository;
        }

        public async Task<GetTopicDetailsOperationResponse> Execute(GetTopicDetailsOperationRequest request)
        {
            var teamTree = await _authorizationContext.GetTeamTree();

            var topic = await _topicRepository.GetByIdAsync(request.TopicId);

            if (teamTree != null)
            {

                var employees = teamTree
                    .GetAllEmployees();

                var subordinates = employees
                    .Select(employee => MapEmployee(employee, topic))
                    .Where(employee => employee.ProgressStatus != ProgressStatus.NotPlanned)
                    .ToList();

                var directSubordinates = teamTree.GetDirectSubordinates()
                    .Select(employee => MapEmployee(employee, topic))
                    .Where(employee => employee.ProgressStatus != ProgressStatus.NotPlanned)
                    .ToList();

                var mappedTeams = employees
                    .Select(employee => employee.ManagedTeam)
                    .Where(team => team != null)
                    .DistinctBy(team => team.Id)
                    .Select(team => MapTeam(team, topic))
                    .Where(team => team.ProgressStatus != ProgressStatus.NotPlanned)
                    .ToList();
                return new GetTopicDetailsOperationResponse
                {
                    Id = topic.Id,
                    Subject = topic.Subject,
                    Description = topic.Description,
                    ParentId = topic.ParentTopic?.Id,
                    ParentSubject = topic.ParentTopic?.Subject,
                    Subordinates = subordinates,
                    DirectSubordinates = directSubordinates,
                    Teams = mappedTeams
                };
            }

            var employee = await _authorizationContext.CurrentEmployee();

            return new GetTopicDetailsOperationResponse
            {
                Id = topic.Id,
                Subject = topic.Subject,
                Description = topic.Description,
                ParentId = topic.ParentTopic?.Id,
                ParentSubject = topic.ParentTopic?.Subject,
                Subordinates = new List<GetTopicDetailsOperationResponse.Employee> { MapEmployee(employee, topic) },
                DirectSubordinates = new List<GetTopicDetailsOperationResponse.Employee> { MapEmployee(employee, topic) },
                Teams = new List<GetTopicDetailsOperationResponse.Team>()
            };
        }


        private GetTopicDetailsOperationResponse.Employee MapEmployee(Domain.Entity.LearningCalendar.Employee employee, Domain.Entity.LearningCalendar.Topic topic)
        {
            var status = _employeeTopicProgressStatusStrategy.GetStatus(employee, topic);
            return new GetTopicDetailsOperationResponse.Employee
            {
                Id = employee.Id,
                FullName = employee.FullName,
                ProgressStatus = ProgressStatusMapper.MapStatus(status)
            };
        }

        private GetTopicDetailsOperationResponse.Team MapTeam(Domain.Entity.LearningCalendar.Team team, Domain.Entity.LearningCalendar.Topic topic)
        {
            var employees = team.Employees
                .Concat(new[] {team.Manager});

            var status = _employeeCollectionTopicProgressStatusStrategy.GetStatus(employees, topic);

            return new GetTopicDetailsOperationResponse.Team
            {
                TeamId = team.Id,
                ManagerId = team.Manager.Id,
                ManagerFullName = team.Manager.FullName,
                EmployeeCount = status.PlannedEmployees.Count + status.LearnedEmployees.Count + status.OtherEmployees.Count,
                LearnedCount = status.LearnedEmployees.Count,
                PlannedCount = status.PlannedEmployees.Count,
                ProgressStatus = ProgressStatusMapper.MapStatus(status.TotalStatus)
            };
        }
    }
}