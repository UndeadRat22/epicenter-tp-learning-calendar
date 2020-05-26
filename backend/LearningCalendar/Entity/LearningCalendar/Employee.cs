using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Epicenter.Domain.Entity.LearningCalendar.ValueObject;
using Epicenter.Infrastructure.Extensions;
using Microsoft.AspNetCore.Identity;

namespace Epicenter.Domain.Entity.LearningCalendar
{
    public class Employee
    {
        public Guid Id { get; set; }
        [Required]
        public IdentityUser Identity { get; set; }
        public Team Team { get; set; }
        public Guid? ManagedTeamId { get; set; }
        public Team ManagedTeam { get; set; }
        public List<LearningDay> LearningDays { get; set; }
        public List<PersonalGoal> PersonalGoals { get; set; }

        [Required] 
        public Guid LimitId { get; set; }
        [Required]
        public Limit Limit { get; set; }
        [Required, MaxLength(50)] 
        public string FirstName { get; set; }
        [Required, MaxLength(50)]
        public string LastName { get; set; }
        [Required]
        public virtual Guid ImageId { get; set; }
        [Required]
        public virtual Image Image { get; set; }
        
        [Required]
        public virtual Guid RoleId { get; set; }
        [Required]
        public virtual Role Role { get; set; }

        #region NonPersistentProperties
        public bool IsTopLevelManager => Team == null;

        public string FullName => $"{FirstName} {LastName}";

        #endregion

        public IEnumerable<LearningDay> GetLearningDaysForQuarter(int quarter)
        {
            return LearningDays
                .Where(day => day.Date.GetQuarter() == quarter);
        }
    }
}