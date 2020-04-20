using System;

namespace Epicenter.Api.Model.Goal
{
    public class CreateTeamGoalModel
    {
        public Guid ManagerId { get; set; }
        public Guid TopicId { get; set; }
    }
}