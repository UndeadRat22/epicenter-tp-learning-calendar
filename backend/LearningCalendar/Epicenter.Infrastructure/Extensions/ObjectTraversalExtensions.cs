using System;
using System.Collections.Generic;

namespace Epicenter.Infrastructure.Extensions
{
    public static class ObjectTraversalExtensions
    {
        public static T FindAnyOrDefault<T>(this T root, Func<T, IEnumerable<T>> childSelector, Func<T, bool> condition)
            where T : class
        {
            if (condition(root))
            {
                return root;
            }

            foreach (T child in childSelector(root))
            {
                T finding = child.FindAnyOrDefault(childSelector, condition);
                if (finding != null)
                {
                    return finding;
                }
            }

            return null;
        }
    }
}