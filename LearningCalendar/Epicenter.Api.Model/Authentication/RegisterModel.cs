using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Epicenter.Api.Model.Authentication
{
    public class RegisterModel
    {
        [JsonProperty("invitationId")]
        public string InvitationId { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}