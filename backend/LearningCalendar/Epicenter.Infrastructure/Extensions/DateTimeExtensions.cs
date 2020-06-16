using System;

namespace Epicenter.Infrastructure.Extensions
{
    public static class DateTimeExtensions
    {
        public static int GetQuarter(this DateTime dateTime)
        {
            return dateTime.Year * 4 + (dateTime.Month - 1) / 3;
        }
    }
}