using System.Threading.Tasks;
using Epicenter.Service.Interface.Mail;

using System.Net;
using System.Net.Mail;
using Epicenter.Infrastructure.Settings;
using Microsoft.Extensions.Options;

namespace Epicenter.Service.Mail
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;

        public EmailService(IOptions<EmailSettings> emailOptions)
        {
            _emailSettings = emailOptions.Value;
        }

        private const string MailServerHost = "smtp.gmail.com";
        private const int SmtpPort = 587;

        public async Task SendEmailAsync(string subject, string text, string receiver)
        {
            using var message = new MailMessage(_emailSettings.Email, receiver)
            {
                Subject = subject,
                Body = text,
                IsBodyHtml = true,
            };

            using var client = new SmtpClient(MailServerHost)
            {
                Port = SmtpPort,
                Credentials = new NetworkCredential(_emailSettings.Email, _emailSettings.Password),
                EnableSsl = true
            };

            await client.SendMailAsync(message);
        }
    }
}