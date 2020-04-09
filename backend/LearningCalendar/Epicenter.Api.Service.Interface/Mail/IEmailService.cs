using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Mail
{
    public interface IEmailService
    {
        Task SendEmail(string subject, string text, string receiver);
    }
}