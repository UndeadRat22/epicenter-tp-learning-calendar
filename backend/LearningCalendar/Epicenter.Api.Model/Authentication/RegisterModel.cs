using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Epicenter.Api.Model.Authentication
{
    public class RegisterModel
    {
        [Required]
        public string InvitationId { get; set; }
        [Required]
        public string Password { get; set; }
    }
}