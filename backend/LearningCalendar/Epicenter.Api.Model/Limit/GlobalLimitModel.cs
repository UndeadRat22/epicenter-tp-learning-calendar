using Epicenter.Service.Interface.Operations.Limit;

namespace Epicenter.Api.Model.Limit
{
    public class GlobalLimitModel
    {
        public GlobalLimitModel(GetGlobalLimitOperationResponse response)
        {
            DaysPerQuarter = response.DaysPerQuarter;
            TopicsPerDay = response.TopicsPerDay;
        }

        public int DaysPerQuarter { get; set; }
        public int TopicsPerDay { get; set; }
    }
}