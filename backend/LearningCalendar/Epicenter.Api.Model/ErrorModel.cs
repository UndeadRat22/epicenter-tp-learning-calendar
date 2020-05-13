namespace Epicenter.Api.Model
{
    public class ErrorModel
    {
        public ErrorModel(string message)
        {
            Message = message;
        }
        public string Message { get; set; }
    }
}