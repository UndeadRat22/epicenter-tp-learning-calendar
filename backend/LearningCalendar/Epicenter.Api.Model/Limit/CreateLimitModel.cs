using System;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Api.Model.Limit
{
    public class CreateLimitModel
    {
        [Required]
        public Guid EmployeeId { get; set; }
        [Required]
        public int DaysPerQuarter { get; set; }
    }
}