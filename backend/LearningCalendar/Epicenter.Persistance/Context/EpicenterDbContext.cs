using Epicenter.Domain.Entity.LearningCalendar;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using Epicenter.Domain.Entity.Infrastructure.Authentication;
using Epicenter.Domain.Entity.Infrastructure.Logging;
using Epicenter.Infrastructure.Cryptography;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

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
        public DbSet<Limit> Limits { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Log> Logs { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //auth
            builder.Entity<IdentityUser>()
                .Property(identity => identity.Email)
                .IsRequired();

            builder.Entity<IdentityUser>()
                .HasIndex(identity => identity.Email)
                .IsUnique();

            //domain
            builder.Entity<Limit>()
                .Property(limit => limit.DaysPerQuarter)
                .HasDefaultValue(Constants.Limit.MaxDaysPerQuarter);
            builder.Entity<Limit>()
                .Property(limit => limit.TopicsPerDay)
                .HasDefaultValue(Constants.Limit.MaxTopicsPerDay);

            builder.Entity<Topic>()
                .HasIndex(topic => topic.Subject)
                .IsUnique();

            builder.Entity<Invite>()
                .HasOne(invite => invite.InvitationFrom)
                .WithMany()
                .HasForeignKey(invite => invite.InvitationFromId);

            builder.Entity<Employee>()
                .HasOne(employee => employee.Identity);

            builder.Entity<Employee>()
                .HasMany(employee => employee.LearningDays)
                .WithOne(learningDay => learningDay.Employee);

            builder.Entity<PersonalGoal>()
                .HasOne(goal => goal.Employee)
                .WithMany(employee => employee.PersonalGoals)
                .HasForeignKey(goal => goal.EmployeeId);

            builder.Entity<PersonalGoal>()
                .HasOne(goal => goal.Topic)
                .WithMany(topic => topic.Goals)
                .HasForeignKey(goal => goal.TopicId);

            builder.Entity<Employee>()
                .HasOne(employee => employee.Limit)
                .WithMany(limit => limit.Employees)
                .HasForeignKey(employee => employee.LimitId);

            builder.Entity<Employee>()
                .HasOne(employee => employee.ManagedTeam)
                .WithOne(team => team.Manager)
                .HasForeignKey<Employee>(employee => employee.ManagedTeamId);

            builder.Entity<Team>()
                .HasMany(team => team.Employees)
                .WithOne(employee => employee.Team);

            builder.Entity<LearningDay>()
                .HasMany(learningDay => learningDay.LearningDayTopics)
                .WithOne(learningDayTopic => learningDayTopic.LearningDay);

            builder.Entity<LearningDayTopic>()
                .HasOne(learningDayTopic => learningDayTopic.Topic)
                .WithMany(topic => topic.LearningDayTopics);

            builder.Entity<Topic>()
                .HasOne(topic => topic.ParentTopic)
                .WithMany(parent => parent.SubTopics)
                .HasForeignKey(topic => topic.ParentTopicId);

            builder.Entity<Employee>()
                .HasOne(employee => employee.Image);

            builder.Entity<Employee>()
                .HasOne(employee => employee.Role)
                .WithMany()
                .HasForeignKey(employee => employee.RoleId);

            builder.Entity<Role>()
                .HasIndex(role => role.Title)
                .IsUnique();

            //infrastructure
            builder.Entity<Log>()
                .HasOne(log => log.User)
                .WithMany()
                .HasForeignKey(log => log.UserId);
        }
    }
}