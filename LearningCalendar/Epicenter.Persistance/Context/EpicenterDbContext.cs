using System;
using Epicenter.Domain.Entity.Authentication;
using Epicenter.Domain.Entity.Team;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Epicenter.Persistence.Context
{
    public class EpicenterDbContext : IdentityDbContext<IdentityUser>
    {
        public EpicenterDbContext(DbContextOptions<EpicenterDbContext> options)
            :base(options) { }


        public DbSet<Employee> Employees { get; set; }
        public DbSet<Invite> Invites { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Invite>()
                .HasOne(invite => invite.InvitationFrom);
        }
    }
}