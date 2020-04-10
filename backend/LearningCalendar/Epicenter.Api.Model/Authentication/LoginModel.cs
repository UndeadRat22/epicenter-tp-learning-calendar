using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Epicenter.Api.Model.Authentication
{
    public class LoginModel
    {
        [Required]
        public string Email { get; set; }


        [Required]
        public string Password { get; set; }
    }
}