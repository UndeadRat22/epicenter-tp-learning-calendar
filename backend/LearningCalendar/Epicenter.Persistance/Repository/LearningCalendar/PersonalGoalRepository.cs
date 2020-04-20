using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;

namespace Epicenter.Persistence.Repository.LearningCalendar
{
    public class PersonalGoalRepository : Generic.Repository<PersonalGoal>, IPersonalGoalRepository
    {
        public PersonalGoalRepository(EpicenterDbContext dbContext) : base(dbContext)
        {
        }
    }
}