using System;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Interface.Repository.Generic;

namespace Epicenter.Persistence.Interface.Repository.LearningCalendar
{
    public interface ITeamRepository : IRepository<Team>
    {
        Task<Team> GetByManagerIdAsync(Guid id);
        Task<Team> GetByManagerEmailAsync(string email);
        Task<Team> GetByIdAsync(Guid id);
        Task<Team> GetTeamTreeAsync(Guid managerId);
    }
}