using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Epicenter.Domain.Entity.Infrastructure.Logging
{
    public class Log
    {
        public Guid Id { get; set; }
        [Required]
        public DateTime Timestamp { get; set; }
        [Required]
        public string Event { get; set; }
        [Required]
        public string Description { get; set; }
        public string UserId { get; set; }
        public IdentityUser User { get; set; }
    }
}