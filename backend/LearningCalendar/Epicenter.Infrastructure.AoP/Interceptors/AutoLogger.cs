using System;
using System.IO;
using Castle.DynamicProxy;

namespace Epicenter.Infrastructure.AoP.Interceptors
{
    public class AutoLogger : IInterceptor
    {
        private readonly TextWriter _textWriter;

        public AutoLogger(TextWriter textWriter)
        {
            _textWriter = textWriter;
        }

        public void Intercept(IInvocation invocation)
        {
            //TODO turn on/off
            //TODO Name, Claims
            var message = $"[{DateTime.Now}]{invocation.Method.DeclaringType}.{invocation.Method.Name}";
            _textWriter.WriteLine(message);
            invocation.Proceed();
        }
    }
}