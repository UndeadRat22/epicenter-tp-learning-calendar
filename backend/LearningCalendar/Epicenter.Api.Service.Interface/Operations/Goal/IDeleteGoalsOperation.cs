using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Goal
{
    public interface IDeleteGoalsOperation
    {
        Task Execute(DeleteGoalsOperationRequest request);
    }

    public class DeleteGoalsOperationRequest
    {
        public List<Guid> TopicIds { get; set; }
    }
}