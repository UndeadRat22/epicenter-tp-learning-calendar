using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Epicenter.Service.Interface.Operations.Topic;

namespace Epicenter.Service.Interface.Operations.Team
{
    public interface IGetSelfTeamTopicTreeOperation
    {
        Task<GetSelfTeamTopicTreeOperationResponse> Execute();
    }

    public class GetSelfTeamTopicTreeOperationResponse
    {
        public Guid ManagerId { get; set; }
        public List<Topic> RootTopics { get; set; }
        public class Topic
        {
            public Guid? ParentTopicId { get; set; }
            public Guid Id { get; set; }
            public string Subject { get; set; }
            public string Description { get; set; }
            public TeamTopicDetails TeamDetails { get; set; }
            public List<Topic> SubTopics { get; set; }
        }

        public class TeamTopicDetails
        {
            public ProgressStatus Status { get; set; }
            public int LearnedCount { get; set; }
            public int PlannedCount { get; set; }
            public int TotalCount { get; set; }
        }
    }
}