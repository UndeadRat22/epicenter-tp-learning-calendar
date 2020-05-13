using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic
{
    public interface IGetTopicTreeOperation
    {
        Task<GetTopicTreeOperationResponse> Execute();
    }

    public class GetTopicTreeOperationResponse
    {
        public List<Topic> Roots { get; set; }
        public class Topic
        {
            public List<Topic> Children { get; set; }
            public Guid Id { get; set; }
            public string Subject { get; set; }
        }
    }
}