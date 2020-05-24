using System;
using System.Collections.Generic;
using System.Linq;
using Epicenter.Service.Interface.Operations.Team;

namespace Epicenter.Api.Model.Team
{
    public class TeamTopicsTreeModel
    {
        public TeamTopicsTreeModel(GetSelfTeamTopicTreeOperationResponse response)
        {
            ManagerId = response.ManagerId;
            RootTopics = response.RootTopics
                .Select(topic => new Topic(topic))
                .ToList();
        }

        public Guid ManagerId { get; set; }
        public List<Topic> RootTopics { get; set; }
        public class Topic
        {
            public Topic(GetSelfTeamTopicTreeOperationResponse.Topic responseTopic)
            {
                ParentTopicId = responseTopic.ParentTopicId;
                Id = responseTopic.Id;
                Name = responseTopic.Subject;
                Description = responseTopic.Description;
                Children = responseTopic.SubTopics
                    .Select(topic => new Topic(topic))
                    .ToList();
                TeamDetails = new TeamTopicDetails(responseTopic.TeamDetails);
            }
            public Guid? ParentTopicId { get; set; }
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public TeamTopicDetails TeamDetails { get; set; }
            public List<Topic> Children { get; set; }
        }

        public class TeamTopicDetails
        {
            public TeamTopicDetails(GetSelfTeamTopicTreeOperationResponse.TeamTopicDetails teamDetails)
            {
                Status = teamDetails.Status.ToString();
                LearnedCount = teamDetails.LearnedCount;
                PlannedCount = teamDetails.PlannedCount;
                TotalCount = teamDetails.TotalCount;
            }

            public string Status { get; set; }
            public int LearnedCount { get; set; }
            public int PlannedCount { get; set; }
            public int TotalCount { get; set; }
        }
    }
}