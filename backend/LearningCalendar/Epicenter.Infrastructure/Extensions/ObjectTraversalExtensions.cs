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
            yield return root;
            IEnumerable<T> children = childSelector(root);
            foreach (T child in children)
            {
                IEnumerable<T> flatChildren = child.Flatten(childSelector);
                foreach (T flatChild in flatChildren)
                {
                    yield return flatChild;
                }
            }
        }
    }
}