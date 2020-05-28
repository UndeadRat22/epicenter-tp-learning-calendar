using System;
using System.Collections.Generic;

namespace Epicenter.Service.Interface.Operations.Topic
{
    public class GetTopicListOperationResponse
    {
        public List<Topic> Topics { get; set; }

        public class Topic
        {
            public Guid Id { get; set; }
            public string Subject { get; set; }
            public string Description { get; set; }
        }
    }
}