using System;
using Epicenter.Service.Strategy.Interface.Topic;

namespace Epicenter.Service.Interface.Operations.Topic
{
    public enum ProgressStatus
    {
        NotPlanned,
        Planned,
        Learned,
    }

    public static class ProgressStatusMapper
    {
        public static ProgressStatus MapStatus(Status status)
        {
            ProgressStatus result = status switch
            {
                Status.Planned => ProgressStatus.Planned,
                Status.Learned => ProgressStatus.Learned,
                Status.NotPlanned => ProgressStatus.NotPlanned,
                _ => throw new ArgumentOutOfRangeException(nameof(status), status, null)
            };
            return result;
        }
    }
}