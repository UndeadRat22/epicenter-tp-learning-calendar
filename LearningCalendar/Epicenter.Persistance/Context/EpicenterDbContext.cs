using Epicenter.Domain.Entity.Authentication;
using Epicenter.Domain.Entity.Team;
using Microsoft.EntityFrameworkCore;

namespace Epicenter.Persistence.Context
{
    public class EpicenterDbContext : DbContext
    {
        public EpicenterDbContext(DbContextOptions<EpicenterDbContext> options)
            :base(options) { }


        public DbSet<Employee> Employees { get; set; }
        public DbSet<User> Users { get; set; }

    }
}