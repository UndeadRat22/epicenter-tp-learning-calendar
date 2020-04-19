using System.ComponentModel.DataAnnotations;

namespace Epicenter.Api.Model.Authentication
{
    public class InviteModel
    {
        [Required]
        public string InviteeEmail { get; set; }
    }
}