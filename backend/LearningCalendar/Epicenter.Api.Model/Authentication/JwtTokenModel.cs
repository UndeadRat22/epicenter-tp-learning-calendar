using System;

namespace Epicenter.Api.Model.Authentication
{
    public class JwtTokenModel
    {
        public DateTime Expires { get; set; }
        public string Token { get; set; }
    }
}