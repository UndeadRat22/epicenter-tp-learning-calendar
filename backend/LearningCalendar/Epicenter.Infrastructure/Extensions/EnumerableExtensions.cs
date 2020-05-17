using System;
using System.Collections.Generic;
using System.Linq;

namespace Epicenter.Infrastructure.Extensions
{
    public static class EnumerableExtensions
    {
        public static IEnumerable<T> DistinctBy<T, TKey>(this IEnumerable<T> enumerable, Func<T, TKey> selector)
        {
            return enumerable.GroupBy(selector).Select(group => group.First());
        }
    }
}