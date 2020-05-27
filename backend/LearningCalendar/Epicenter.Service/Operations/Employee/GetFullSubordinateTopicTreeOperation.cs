using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Exceptions.Team;
using Epicenter.Service.Interface.Operations.Topic;
using Epicenter.Service.Strategy.Interface.Topic;

namespace Epicenter.Service.Operations.Employee
{
    public class GetFullSubordinateTopicTreeOperation : Operation, IGetFullSubordinateTopicTreeOperation
    {
        private readonly ITopicRepository _topicRepository;
        private readonly IAuthorizationContext _authorizationContext;
        private readonly IEmployeeCollectionTopicProgressStatusStrategy _employeeCollectionTopicProgressStatusStrategy;

        public GetFullSubordinateTopicTreeOperation(
            ITopicRepository topicRepository, 
            IAuthorizationContext authorizationContext, 
            IEmployeeCollectionTopicProgressStatusStrategy employeeCollectionTopicProgressStatusStrategy)
        {
            _topicRepository = topicRepository;
            _authorizationContext = authorizationContext;
            _employeeCollectionTopicProgressStatusStrategy = employeeCollectionTopicProgressStatusStrategy;
        }

        public async Task<GetFullSubordinateTopicTreeOperationResponse> Execute()
        {
            var topics = await _topicRepository.GetRootTopics();
            var teamTree = await _authorizationContext.GetTeamTree();
            var manager = await _authorizationContext.CurrentEmployee();
            if (teamTree == null)
            {
                throw new EmployeeDoesNotManageAnyTeamException(manager.Id);
            }
            var employees = teamTree.GetAllEmployees();

            return new GetFullSubordinateTopicTreeOperationResponse
            {
                Roots = topics
                    .Select(topic => MapToResponse(topic, employees))
                    .ToList()
            };
        }

        private GetFullSubordinateTopicTreeOperationResponse.Topic MapToResponse(
            Domain.Entity.LearningCalendar.Topic topic, 
            List<Domain.Entity.LearningCalendar.Employee> employees)
        {
            var status = _employeeCollectionTopicProgressStatusStrategy.GetEmployeeCollectionStatusForTopic(employees, topic);

            return new GetFullSubordinateTopicTreeOperationResponse.Topic
            {
                Id = topic.Id,
                Children = topic.SubTopics.Select(subTopic => MapToResponse(subTopic, employees)).ToList(),
                PlannedEmployees = status.PlannedEmployees.Select(MapEmployee).ToList(),
                LearnedEmployees = status.LearnedEmployees.Select(MapEmployee).ToList(),
                NotPlannedEmployees = status.OtherEmployees.Select(MapEmployee).ToList()
            };
        }

        private GetFullSubordinateTopicTreeOperationResponse.Employee MapEmployee(Domain.Entity.LearningCalendar.Employee employee)
        {
            return new GetFullSubordinateTopicTreeOperationResponse.Employee
            {
                FullName = employee.FullName,
                Id = employee.Id
            };
        }
    }
}