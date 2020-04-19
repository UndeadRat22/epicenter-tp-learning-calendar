using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Interface.Repository.Generic;

namespace Epicenter.Persistence.Interface.Repository.LearningCalendar
{
    public interface ILimitRepository : IRepository<Limit>
    {
        Task<Limit> GetGlobalAsync();
        Task<Limit> CreateDefaultGlobalLimitAsync();
    }
}