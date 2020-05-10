using System.ComponentModel.DataAnnotations;

namespace Epicenter.Api.Model.Authentication
{
    public class InviteModel
    {
        [Required]
        public string Email { get; set; }
        [Required] 
        public string FirstName { get; set; }
        [Required] 
        public string LastName { get; set; }

        public string Role { get; set; }
    }
}