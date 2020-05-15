using System;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Microsoft.EntityFrameworkCore;

namespace Epicenter.Persistence.Repository.LearningCalendar
{
    public class TopicRepository : Generic.Repository<Topic>, ITopicRepository
    {
        public TopicRepository(EpicenterDbContext dbContext) : base(dbContext)
        {
        }


        public async Task<Topic> GetByIdAsync(Guid id)
        {
            var result = await DbContext.Topics
                .Include(topic => topic.ParentTopic)
                .Where(topic => topic.Id == id)
                .SingleOrDefaultAsync();
            return result;
        }
    }
}