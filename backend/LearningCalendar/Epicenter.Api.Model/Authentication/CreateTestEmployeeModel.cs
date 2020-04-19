using System.ComponentModel.DataAnnotations;

namespace Epicenter.Api.Model.Authentication
{
    public class CreateTestEmployeeModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string ManagerEmail { get; set; }

    }
}