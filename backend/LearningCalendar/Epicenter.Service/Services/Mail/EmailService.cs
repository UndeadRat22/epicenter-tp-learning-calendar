using System.Threading.Tasks;
using Epicenter.Infrastructure.Settings;
using Epicenter.Service.Interface.Services.Mail;
using Microsoft.Extensions.Options;

using SendGrid;
using SendGrid.Helpers.Mail;

namespace Epicenter.Service.Services.Mail
{
    public class EmailService : IEmailService
    {
        private const string NoReplyEmail = @"noreply@epicenter.com";
        private const string NoReplyMailerName = @"Epicenter";
        private readonly EmailSettings _emailSettings;
        public EmailService(IOptions<EmailSettings> emailOptions)
        {
            _emailSettings = emailOptions.Value;
        }

        public async Task SendEmailAsync(string subject, string text, string receiver)
        {
            var message = new SendGridMessage
            {
                Subject = subject,
                HtmlContent = text,
                From = new EmailAddress(NoReplyEmail, NoReplyMailerName)
            };

            message.AddTo(new EmailAddress(receiver));

            var client = new SendGridClient(_emailSettings.SendGridApiKey);

            await client.SendEmailAsync(message);
        }
    }
}