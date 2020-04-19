using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Epicenter.Domain.Entity.LearningCalendar
{
    public class Employee
    {
        [Required]
        public IdentityUser Identity { get; set; }
        public Guid Id { get; set; }
        public Team Team { get; set; }
        public List<LearningDay> LearningDays { get; set; }
        public List<PersonalGoal> PersonalGoals { get; set; }
        public Limit Limit { get; set; }
    }
}