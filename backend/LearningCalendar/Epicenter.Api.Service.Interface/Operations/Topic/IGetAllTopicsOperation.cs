using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic
{
    public interface IGetAllTopicsOperation
    {
        Task<GetAllTopicsOperationResponse> Execute();
    }

    public class GetAllTopicsOperationResponse
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