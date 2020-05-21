using System;
using System.Collections.Generic;
using System.Linq;

namespace Epicenter.Infrastructure.Extensions
{
    public static class ObjectTraversalExtensions
    {
        public static T FindAnyOrDefault<T>(this T root, Func<T, IEnumerable<T>> childSelector, Func<T, bool> predicate)
            where T : class
        {
            return root.Flatten(childSelector).FirstOrDefault(predicate);
        }

        public static IEnumerable<T> Flatten<T>(this T root, Func<T, IEnumerable<T>> childSelector)
        {
            if (root == null)
            {
                yield break;
            }
            yield return root;
            var children = childSelector(root);
            if (children == null)
            {
                yield break;
            }
            foreach (var child in children)
            {
                foreach (var value in child.Flatten(childSelector))
                {
                    yield return value;
                }
            }
        }
    }
}