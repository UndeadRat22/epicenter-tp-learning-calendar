using System;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Employee;

namespace Epicenter.Service.Employee
{
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public TeamService(ITeamRepository teamRepository, IEmployeeRepository employeeRepository)
        {
            _teamRepository = teamRepository;
            _employeeRepository = employeeRepository;
        }

        public async Task<TeamDto> GetOrCreateForManagerAsync(Guid employeeId)
        {
            var team = await _teamRepository.GetByManagerId(employeeId);
            if (team == null)
            {
                var manager = await _employeeRepository.GetById(employeeId);
                team = new Team
                {
                    Id = Guid.NewGuid(),
                    Manager = manager
                };

                await _teamRepository.CreateAsync(team);
            }

            return new TeamDto
            {
                TeamId = team.Id,
                EmployeeIds = team.Employees.Select(employee => employee.Id).ToList(),
                ManagerId = team.Manager.Id
            };
        }
    }
}