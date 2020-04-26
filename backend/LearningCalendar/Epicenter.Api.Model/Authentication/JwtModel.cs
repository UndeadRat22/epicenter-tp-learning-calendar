using System;

namespace Epicenter.Api.Model.Authentication
{
    public class JwtModel
    {
        public DateTime Expires { get; set; }
        public string Token { get; set; }
    }
}