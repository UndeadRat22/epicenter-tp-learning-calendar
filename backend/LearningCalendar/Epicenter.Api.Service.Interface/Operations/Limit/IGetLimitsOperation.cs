﻿using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Limit
{
    public interface IGetLimitsOperation
    {
        Task<GetLimitsOperationResponse> Execute(GetLimitsOperationRequest request);
    }

    public class GetLimitsOperationRequest
    {
        public DateTime Date { get; set; }
    }

    public class GetLimitsOperationResponse
    {
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