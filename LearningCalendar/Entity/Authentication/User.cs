using System;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Domain.Entity.Authentication
{
    public class User : IEntity
    {
        public Guid Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}