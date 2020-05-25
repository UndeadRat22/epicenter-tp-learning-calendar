﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Extensions;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Exceptions.Team;
using Epicenter.Service.Interface.Operations.Team;
using Epicenter.Service.Interface.Operations.Topic;
using Epicenter.Service.Strategy.Interface.Topic;

namespace Epicenter.Service.Operations.Team
{
    public class GetSelfTeamTopicTreeOperation : Operation, IGetSelfTeamTopicTreeOperation
    {
        private readonly ITeamTopicProgressStatusStrategy _progressStatusStrategy;
        private readonly IAuthorizationContext _authorizationContext;
        private readonly ITopicRepository _topicRepository;
        private readonly ITeamRepository _teamRepository;

        public GetSelfTeamTopicTreeOperation(
            ITeamTopicProgressStatusStrategy progressStatusStrategy, 
            IAuthorizationContext authorizationContext, 
            ITopicRepository topicRepository, 
            ITeamRepository teamRepository)
        {
            _progressStatusStrategy = progressStatusStrategy;
            _authorizationContext = authorizationContext;
            _topicRepository = topicRepository;
            _teamRepository = teamRepository;
        }

        public async Task<GetSelfTeamTopicTreeOperationResponse> Execute()
        {
            var manager = await _authorizationContext.CurrentEmployee();
            var team = await _teamRepository.GetByManagerIdAsync(manager.Id);
            if (team == null)
            {
                throw new EmployeeDoesNotManageAnyTeamException(manager.Id);
            }

            var learningDayTopicIds = team.Employees
                .SelectMany(employee => employee.LearningDays
                    .SelectMany(day => day.LearningDayTopics
                        .Select(dayTopic => dayTopic.TopicId)));

            var goalTopicIds = team.Employees
                .SelectMany(employee => employee.PersonalGoals
                    .Select(goal => goal.TopicId));

            var allTopicIds = learningDayTopicIds
                .Concat(goalTopicIds)
                .Distinct()
                .ToHashSet();

            var topicRoots = await _topicRepository.GetRootTopics();

            return new GetSelfTeamTopicTreeOperationResponse
            {
                ManagerId = manager.Id,
                RootTopics = topicRoots
                    .Select(topic => MapTopic(team, topic, allTopicIds))
                    .Where(root => root != null)
                    .ToList()
            };
        }

        private GetSelfTeamTopicTreeOperationResponse.Topic MapTopic(
            Domain.Entity.LearningCalendar.Team team,
            Domain.Entity.LearningCalendar.Topic root, 
            HashSet<Guid> inclusiveIds)
        {
            var matchingChild = root
                .FindAnyOrDefault(
                    parent => parent.SubTopics, 
                    child => inclusiveIds.Contains(child.Id));

            GetSelfTeamTopicTreeOperationResponse.Topic result;

            if (matchingChild != null)
            {
                var children = root.SubTopics
                    .Select(topic => MapTopic(team, topic, inclusiveIds))
                    .Where(topic => topic != null)
                    .ToList();

                var status = _progressStatusStrategy.GetStatus(team, root);

                result = new GetSelfTeamTopicTreeOperationResponse.Topic
                {
                    Id = root.Id,
                    ParentTopicId = root.ParentTopicId,
                    Subject = root.Subject,
                    Description = root.Description,
                    SubTopics = children,
                    TeamDetails = MapStatus(status)
                };
            }
            else
            {
                result = null;
            }
            return result;
        }

        private GetSelfTeamTopicTreeOperationResponse.TeamTopicDetails MapStatus(TeamProgressStatus teamStatus)
        {
            return new GetSelfTeamTopicTreeOperationResponse.TeamTopicDetails
            {
                Status = ProgressStatusMapper.MapStatus(teamStatus.Status),
                TotalCount = teamStatus.TotalCount,
                LearnedCount = teamStatus.LearnedCount,
                PlannedCount = teamStatus.PlannedCount,
            };
        }
    }
}