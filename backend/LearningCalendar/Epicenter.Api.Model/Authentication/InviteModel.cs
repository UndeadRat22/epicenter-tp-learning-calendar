using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Epicenter.Api.Model.Authentication
{
    public class InviteModel
    {
        [Required]
        public string InviteeEmail { get; set; }
    }
}