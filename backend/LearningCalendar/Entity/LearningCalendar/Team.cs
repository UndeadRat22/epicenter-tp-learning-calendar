using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Domain.Entity.LearningCalendar
{
    public class Team
    {
        public Guid Id { get; set; }
        [Required]
        public Employee Manager { get; set; }
        public List<Employee> Employees { get; set; }
    }
}