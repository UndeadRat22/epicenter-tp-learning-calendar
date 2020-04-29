using Epicenter.Service.Interface.Operations.Limit;
using System;

namespace Epicenter.Api.Model.Limit
{
    public class LimitsModel
    {
        public LimitsModel(GetLimitsOperationResponse response)
        {
            Id = response.Id;
            AssignedLimit = new Limit
            {
                DaysPerQuarter = response.AssignedLimit.DaysPerQuarter,
                TopicsPerDay = response.AssignedLimit.TopicsPerDay
            };
            RemainingLimit = new Limit
            {
                DaysPerQuarter = response.RemainingLimit.DaysPerQuarter,
                TopicsPerDay = response.RemainingLimit.TopicsPerDay
            };
        }

        public Guid Id { get; set; }
        public Limit AssignedLimit { get; set; }
        public Limit RemainingLimit { get; set; }

        public class Limit
        {
            public int DaysPerQuarter { get; set; }
            public int TopicsPerDay { get; set; }
        }
    }
}