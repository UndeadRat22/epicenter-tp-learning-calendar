using System.ComponentModel.DataAnnotations;

namespace Epicenter.Api.Model.Authentication
{
    public class CreateTestEmployeeModel
    {
        [Required]
        public string Password { get; set; }
        [Required]
        public string ManagerEmail { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageData { get; set; }

    }
}