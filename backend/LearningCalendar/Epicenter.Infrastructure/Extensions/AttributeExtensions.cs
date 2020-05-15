using System;
using System.Linq;

namespace Epicenter.Infrastructure.Extensions
{
    public static class AttributeExtensions
    {
        public static bool HasAttribute<T>(this Type type) where T : Attribute
        {
            return type.GetCustomAttributes(typeof(T), true).FirstOrDefault() is T;
        }
    }
}