using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Services.Mail
{
    public interface IEmailService
    {
        Task SendEmailAsync(string subject, string text, string receiver);
    }
}