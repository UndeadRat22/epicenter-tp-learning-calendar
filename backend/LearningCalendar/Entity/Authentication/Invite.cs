using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Epicenter.Domain.Entity.Authentication
{
    public class Invite : IEntity
    {
        public Guid Id { get; set; }
        [Required] 
        public IdentityUser InvitationFrom { get; set; }
        [Required]
        public string InvitationTo { get; set; }
        [Required]
        public DateTime Created { get; set; }
    }
}