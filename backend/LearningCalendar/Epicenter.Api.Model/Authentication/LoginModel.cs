using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Epicenter.Api.Model.Authentication
{
    public class LoginModel
    {
        [Required]
        [JsonProperty("email")]
        public string Email { get; set; }


        [Required]
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}