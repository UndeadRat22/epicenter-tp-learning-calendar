using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;

namespace Epicenter.Persistence.Repository.LearningCalendar
{
    public class TopicRepository : Generic.Repository<Topic>, ITopicRepository
    {
        public TopicRepository(EpicenterDbContext dbContext) : base(dbContext)
        {
        }
    }
}