using System;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Domain.Entity.LearningCalendar
{
    public class PersonalGoal : Goal
    {
        [Required]
        public Employee Employee { get; set; }
        [Required]
        public Guid EmployeeId { get; set; }
    }
}