using System;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.Infrastructure.Authentication;
using Epicenter.Persistence.Interface.Repository.Generic;

namespace Epicenter.Persistence.Interface.Repository.Authentication
{
    public interface IInvitationRepository : IRepository<Invite>
    {
        Task<Invite> GetWithInviterAsync(Guid id);
    }
}