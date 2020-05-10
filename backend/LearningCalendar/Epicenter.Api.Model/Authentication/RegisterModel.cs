using System;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Api.Model.Authentication
{
    public class RegisterModel
    {
        [Required]
        public Guid InviteId { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string ImageData { get; set; }
    }
}