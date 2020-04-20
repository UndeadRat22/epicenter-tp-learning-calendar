using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.Team;

namespace Epicenter.Service.Operations.Team
{
    public class GetDirectSubordinatesOperation : IGetDirectSubordinatesOperation
    {
        private readonly ITeamRepository _teamRepository;

        public GetDirectSubordinatesOperation(ITeamRepository teamRepository)
        {
            _teamRepository = teamRepository;
        }

        public async Task<GetDirectSubordinatesOperationResponse> Execute(GetDirectSubordinatesOperationRequest request)
        {
            var team = await _teamRepository.GetByManagerIdAsync(request.ManagerId);

            var employees = team.Employees
                .Select(employee => new GetDirectSubordinatesOperationResponse.Employee
                {
                    Id = employee.Id,
                    Name = employee.Identity.Email,
                    GoalTopics = MapGoals(employee)
                })
                .ToList();

            return new GetDirectSubordinatesOperationResponse
            {
                ManagerId = request.ManagerId,
                Employees = employees
            };
        }

        private List<GetDirectSubordinatesOperationResponse.Goal> MapGoals(Domain.Entity.LearningCalendar.Employee employee)
        {
            var goals = employee.PersonalGoals
                .Select(goal => new GetDirectSubordinatesOperationResponse.Goal
                {
                    Topic = goal.Topic.Subject,
                    TopicId = goal.Topic.Id
                }).ToList();
            return goals;
        }
    }
}