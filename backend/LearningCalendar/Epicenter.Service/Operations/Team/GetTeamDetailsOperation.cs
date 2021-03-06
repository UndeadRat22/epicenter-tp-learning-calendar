﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Extensions;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.Team;

namespace Epicenter.Service.Operations.Team
{
    public class GetTeamDetailsOperation : Operation, IGetTeamDetailsOperation
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public GetTeamDetailsOperation(
            ITeamRepository teamRepository, 
            IEmployeeRepository employeeRepository)
        {
            _teamRepository = teamRepository;
            _employeeRepository = employeeRepository;
        }

        public async Task<GetTeamDetailsOperationResponse> Execute(GetTeamDetailsOperationRequest request)
        {
            var team = await _teamRepository.GetByManagerIdAsync(request.ManagerId);

            var manager = 
                team?.Manager ??
                await _employeeRepository.GetByIdAsync(request.ManagerId);

            var employees = team?.Employees
                .Select(employee => new GetTeamDetailsOperationResponse.Employee
                {
                    Id = employee.Id,
                    Name = employee.FullName,
                    GoalTopics = MapGoals(employee),
                    Limit = new GetTeamDetailsOperationResponse.Limit
                    {
                        LearningDaysPerQuarter = employee.Limit.DaysPerQuarter,
                        TopicsPerDay = employee.Limit.TopicsPerDay,
                        CreatedLearningDaysThisQuarter = employee
                            .GetLearningDaysForQuarter(DateTime.Today.GetQuarter())
                            .Count()
                    }
                })
                .ToList() ?? new List<GetTeamDetailsOperationResponse.Employee>();

            return new GetTeamDetailsOperationResponse
            {
                Team = new GetTeamDetailsOperationResponse.Details
                {
                    Manager = new GetTeamDetailsOperationResponse.Employee
                    {
                        Id = request.ManagerId,
                        Name = manager.FullName,
                        GoalTopics = null
                    },
                    Employees = employees
                }
            };
        }

        private List<GetTeamDetailsOperationResponse.Goal> MapGoals(Domain.Entity.LearningCalendar.Employee employee)
        {
            var goals = employee.PersonalGoals
                .Where(goal => !goal.IsComplete)
                .Select(goal => new GetTeamDetailsOperationResponse.Goal
                {
                    Topic = goal.Topic.Subject,
                    TopicId = goal.Topic.Id
                }).ToList();
            return goals;
        }
    }
}