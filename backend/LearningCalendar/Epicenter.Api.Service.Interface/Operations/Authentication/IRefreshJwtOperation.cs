namespace Epicenter.Service.Interface.Operations.Authentication
{
    public interface IRefreshJwtOperation
    {
        JwtResponse Execute();
    }
}