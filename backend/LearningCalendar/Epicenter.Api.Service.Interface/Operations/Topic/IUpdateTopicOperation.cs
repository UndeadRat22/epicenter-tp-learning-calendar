using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Topic
{
    public interface IUpdateTopicOperation
    {
        public Task Execute(UpdateTopicOperationRequest request);
    }

    public class UpdateTopicOperationRequest
    {
        public Guid Id { get; set; }
        public string Subject { get; set; }  
        public string Description { get; set; }  
        public Guid? ParentTopicId { get; set; }
    }
}