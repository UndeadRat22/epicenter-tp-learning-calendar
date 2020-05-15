using System;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;

namespace Epicenter.Persistence.Interface.Repository.LearningCalendar
{
    public interface ITopicRepository : Generic.IRepository<Topic>
    {
        Task<Topic> GetByIdAsync(Guid id);
    }
}