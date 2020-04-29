using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;

namespace Epicenter.Persistence.Repository.LearningCalendar
{
    public class LearningDayTopicRepository : Generic.Repository<LearningDayTopic>, ILearningDayTopicRepository
    {
        public LearningDayTopicRepository(EpicenterDbContext dbContext) : base(dbContext)
        {
        }
    }
}