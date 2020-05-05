using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Epicenter.Domain.Entity.Authentication
{
    public class Invite
    {
        public Guid Id { get; set; }
        [Required]
        public string InvitationFromId { get; set; }
        [Required]
        public IdentityUser InvitationFrom { get; set; }
        [Required]
        public string InvitationTo { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Role { get; set; }
        [Required]
        public DateTime Created { get; set; }
    }
}