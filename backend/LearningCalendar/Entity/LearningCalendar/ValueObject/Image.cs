using System;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Domain.Entity.LearningCalendar.ValueObject
{
    public class Image
    {
        public Guid Id { get; set; }
        [MaxLength]
        public string Value { get; set; }
    }
}