using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Epicenter.Api.Model.Attributes;

namespace Epicenter.Api.Model.Goal
{
    public class CreateTeamGoalsModel
    {
        [Required, MinimumElementsRequired(1)]
        public List<Guid> TopicIds { get; set; }
    }
}