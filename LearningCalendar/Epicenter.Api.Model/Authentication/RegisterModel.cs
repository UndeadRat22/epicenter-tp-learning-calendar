using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Epicenter.Api.Model.Authentication
{
    public class RegisterModel
    {
        [Required]
        [JsonProperty("email")]
        public string Email { get; set; }
    }
}