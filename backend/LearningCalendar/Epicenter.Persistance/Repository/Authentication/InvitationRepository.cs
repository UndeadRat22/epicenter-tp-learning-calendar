using System;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.Authentication;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.Authentication;
using Microsoft.EntityFrameworkCore;

namespace Epicenter.Persistence.Repository.Authentication
{
    public class InvitationRepository : Generic.Repository<Invite>, IInvitationRepository
    {
        public InvitationRepository(EpicenterDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Invite> GetWithInviter(Guid id)
        {
            return await DbContext.Invites.Include(invite => invite.InvitationFrom)
                .Where(invite => invite.Id == id)
                .SingleOrDefaultAsync();
        }
    }
}