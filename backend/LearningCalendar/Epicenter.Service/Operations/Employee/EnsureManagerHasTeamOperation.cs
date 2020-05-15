using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Exceptions.Authentication;
using Epicenter.Service.Interface.Operations.Employee;

namespace Epicenter.Service.Operations.Employee
{
    public class EnsureManagerHasTeamOperation : Operation, IEnsureManagerHasTeamOperation
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public EnsureManagerHasTeamOperation(ITeamRepository teamRepository, IEmployeeRepository employeeRepository)
        {
            _teamRepository = teamRepository;
            _employeeRepository = employeeRepository;
        }

        public async Task<EnsureManagerHasTeamResponse> Execute(EnsureManagerHasTeamRequest request)
        {
            var team = await _teamRepository.GetByManagerIdAsync(request.ManagerId);
            if (team == null)
            {
                var manager = await _employeeRepository.GetByIdAsync(request.ManagerId);
                if (manager == null)
                {
                    throw new ManagerNotFoundException(request.ManagerId);
                }
                
                team = new Domain.Entity.LearningCalendar.Team
                {
                    Manager = manager,
                    Employees = null
                };

                await _teamRepository.UpdateAsync(team);
            }

            return new EnsureManagerHasTeamResponse
            {
                TeamId = team.Id,
                EmployeeIds = team.Employees?.Select(employee => employee.Id).ToList() ?? new List<Guid>(),
                ManagerId = team.Manager.Id
            };
        }
    }

}