using System;
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
    public class GetSpecificTeamTopicTreeOperation : Operation, IGetSpecificTeamTopicTreeOperation
    {
        private readonly ITeamTopicProgressStatusStrategy _progressStatusStrategy;
        private readonly IAuthorizationContext _authorizationContext;
        private readonly ITopicRepository _topicRepository;
        private readonly ITeamRepository _teamRepository;

        public GetSpecificTeamTopicTreeOperation(
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

        public async Task<GetTeamTopicTreeOperationResponse> Execute(GetSpecificTeamTopicTreeOperationRequest request)
        {
            var manager = await _authorizationContext.GetEmployeeIfAuthorizedFor(request.EmployeeId);

            if (manager == null)
            {
                throw new ApplicationException($"Not authorized for '{request.EmployeeId}'");
            }

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

            return new GetTeamTopicTreeOperationResponse
            {
                ManagerId = manager.Id,
                RootTopics = topicRoots
                    .Select(topic => MapTopic(team, topic, allTopicIds))
                    .Where(root => root != null)
                    .ToList()
            };
        }

        private GetTeamTopicTreeOperationResponse.Topic MapTopic(
            Domain.Entity.LearningCalendar.Team team,
            Domain.Entity.LearningCalendar.Topic root,
            HashSet<Guid> inclusiveIds)
        {
            var matchingChild = root
                .FindAnyOrDefault(
                    parent => parent.SubTopics,
                    child => inclusiveIds.Contains(child.Id));

            GetTeamTopicTreeOperationResponse.Topic result;

            if (matchingChild != null)
            {
                var children = root.SubTopics
                    .Select(topic => MapTopic(team, topic, inclusiveIds))
                    .Where(topic => topic != null)
                    .ToList();

                var status = _progressStatusStrategy.GetStatus(team, root);

                result = new GetTeamTopicTreeOperationResponse.Topic
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

        private GetTeamTopicTreeOperationResponse.TeamTopicDetails MapStatus(TeamProgressStatus teamStatus)
        {
            return new GetTeamTopicTreeOperationResponse.TeamTopicDetails
            {
                Status = ProgressStatusMapper.MapStatus(teamStatus.Status),
                TotalCount = teamStatus.TotalCount,
                LearnedCount = teamStatus.LearnedCount,
                PlannedCount = teamStatus.PlannedCount,
            };
        }
    }
}