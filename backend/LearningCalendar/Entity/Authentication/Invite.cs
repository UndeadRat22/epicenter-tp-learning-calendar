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
        public DateTime Created { get; set; }
    }
}