using System;
using System.IO;
using System.Linq;
using Castle.DynamicProxy;

namespace Epicenter.Infrastructure.AoP.Interceptors
{
    public class AutoLogger : IInterceptor
    {
        private TextWriter _textWriter;

        public AutoLogger(TextWriter textWriter)
        {
            _textWriter = textWriter;
        }

        public void Intercept(IInvocation invocation)
        {
            //TODO turn on/off
            //TODO Name, Claims
            var args = string.Join(", ", invocation.Arguments.Select(a => (a ?? "null").ToString()));
            var message = $"[{DateTime.Now}]{invocation.Method.DeclaringType}.{invocation.Method.Name}, ({args})";
            _textWriter.WriteLine(message);
            invocation.Proceed();
        }
    }
}