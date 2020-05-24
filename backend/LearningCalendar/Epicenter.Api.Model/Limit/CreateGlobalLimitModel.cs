using System;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Api.Model.Limit
{
    public class CreateGlobalLimitModel
    {
        [Required]
        public int DaysPerQuarter { get; set; }
    }
}