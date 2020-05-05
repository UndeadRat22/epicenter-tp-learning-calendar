using System;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Api.Model.Authentication
{
    public class RegisterModel
    {
        [Required]
        public Guid InvitationId { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string ImageData { get; set; }
    }
}