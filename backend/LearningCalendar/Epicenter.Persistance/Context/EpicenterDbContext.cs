using System;
using Epicenter.Domain.Entity.Authentication;
using Epicenter.Domain.Entity.LearningCalendar;
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
        public DbSet<Goal> Goals { get; set; }
        public DbSet<PersonalGoal> PersonalGoals { get; set; }
        public DbSet<LearningDay> LearningDays { get; set; }
        public DbSet<LearningDayTopic> LearningDayTopics { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Topic> Topics { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            //? tikslas padaryt kad tik vienas employee galėtų neturėt komandos
            builder.Entity<Invite>()
                .HasOne(invite => invite.InvitationFrom);
            builder.Entity<Employee>()
                .HasOne(employee => employee.Identity);
            //employee
            builder.Entity<Employee>()
                .HasMany(employee => employee.LearningDays)
                .WithOne(learningDay => learningDay.Employee);

            builder.Entity<Employee>()
                .HasMany(employee => employee.PersonalGoals)
                .WithOne(personalGoal => personalGoal.Employee);

            builder.Entity<Employee>()
                .HasOne(employee => employee.Team)
                .WithMany(manager => manager.Employees);
            //TODO Role
            builder.Entity<Team>()
                .HasOne(team => team.Manager);

            builder.Entity<Goal>()
                .HasOne(goal => goal.Topic);

            builder.Entity<LearningDay>()
                .HasMany(learningDay => learningDay.LearningDayTopics)
                .WithOne(learningDayTopic => learningDayTopic.LearningDay);

            builder.Entity<LearningDayTopic>()
                .HasOne(learningDayTopic => learningDayTopic.Topic);
        }
    }
}