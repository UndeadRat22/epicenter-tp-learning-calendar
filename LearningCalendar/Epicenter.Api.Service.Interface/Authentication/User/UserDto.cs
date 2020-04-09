using System;

namespace Epicenter.Service.Interface.Authentication.User
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
    }
}