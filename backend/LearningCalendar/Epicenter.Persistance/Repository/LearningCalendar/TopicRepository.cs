using System;
using System.Collections.Generic;
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

        public async Task<List<Topic>> GetRootTopics()
        {
            var result = await DbContext.Topics
                .Include(topic => topic.ParentTopic)
                .Include(topic => topic.SubTopics)
                .ToListAsync();

            return result
                .Where(topic => !topic.HasParent)
                .ToList();
        }

        public async Task<List<Topic>> GetRootTopicsWithEmployees()
        {
            var result = await DbContext.Topics
                .Include(topic => topic.ParentTopic)
                .Include(topic => topic.SubTopics)
                .Include(topic => topic.Goals)
                    .ThenInclude(goal => goal.Employee)
                .Include(topic => topic.LearningDayTopics)
                    .ThenInclude(learningDayTopic => learningDayTopic.LearningDay)
                        .ThenInclude(learningDay => learningDay.Employee)
                .ToListAsync();

            return result
                .Where(topic => !topic.HasParent)
                .ToList();
        }
    }
}