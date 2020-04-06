using System;

namespace Epicenter.Infrastructure.Extensions
{
    public static class StringExtensions
    {
        public static string TrimEndString(this string str, string endString)
        {
            return str.Substring(0, str.LastIndexOf(endString, StringComparison.InvariantCulture));
        }
    }
}