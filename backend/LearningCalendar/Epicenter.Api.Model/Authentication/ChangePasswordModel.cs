﻿namespace Epicenter.Api.Model.Authentication
{
    public class ChangePasswordModel
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}