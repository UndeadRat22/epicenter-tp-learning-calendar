using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Employee
{
    public interface ITeamService
    {
        Task<TeamDto> GetOrCreateForManagerAsync(Guid employeeId);
    }
}