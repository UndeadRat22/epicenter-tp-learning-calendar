using Epicenter.Domain.Entity.Team;
using Microsoft.EntityFrameworkCore;

namespace Epicenter.Persistence.Context
{
    public class EpicenterDbContext : DbContext
    {
        public EpicenterDbContext(DbContextOptions<EpicenterDbContext> options)
            :base(options) { }


        public DbSet<Employee> Employees { get; set; }

        //could use reflection to load the Epicenter.Domain.Entity assembly,
        //then proceed to get all non-abstract types derived from IEntity, apply some naming conventions and use those
        //types and strings in OnModelCreating.
        /*protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeEntity>();
        }*/
    }
}