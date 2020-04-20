using System;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Api.Model.Goal
{
    public class CreateEmployeeGoalModel
    {
        [Required]
        public Guid EmployeeId { get; set; }
        [Required]
        public Guid TopicId { get; set; }
    }
}