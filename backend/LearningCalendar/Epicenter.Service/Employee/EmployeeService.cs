using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Authentication.User;
using Epicenter.Service.Interface.Employee;
using Microsoft.AspNetCore.Identity;

namespace Epicenter.Service.Employee
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IUserService _userService;
        private readonly ILimitRepository _limitRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ITeamService _teamService;
        private readonly ITeamRepository _teamRepository;
        private readonly IRepository<IdentityUser> _identityRepository;

        public EmployeeService(IUserService userService, ILimitRepository limitRepository, IEmployeeRepository employeeRepository, ITeamService teamService, ITeamRepository teamRepository, IRepository<IdentityUser> identityRepository)
        {
            _userService = userService;
            _limitRepository = limitRepository;
            _employeeRepository = employeeRepository;
            _teamService = teamService;
            _teamRepository = teamRepository;
            _identityRepository = identityRepository;
        }

        public async Task<List<EmployeeDto>> GetEmployees()
        {
            List<Domain.Entity.LearningCalendar.Employee> employees = await _employeeRepository.ListAsync();

            return employees
                .Select(employee => new EmployeeDto
                {
                }).ToList();
        }

        public async Task<EmployeeDto> Create(string email, string password, string managerEmail)
        {
            if (managerEmail == null)
            {
                var topLevelManager = _employeeRepository.GetTopLevelManager();
                if (topLevelManager != null)
                {
                    throw new ApplicationException("Top level manager already exists");
                }
            }

            return await CreateEmployeeWithoutChecks(email, password, managerEmail);
        }

        private async Task<EmployeeDto> CreateEmployeeWithoutChecks(string email, string password, string managerEmail)
        {
            Task<UserDto> identityTask = _userService.Create(email, password);
            Task<Limit> globalLimitTask = _limitRepository.GetGlobal();

            var manager = await _employeeRepository.GetByEmail(managerEmail);

            Team team = null;
            if (manager != null)
            {
                TeamDto teamDto = await _teamService.GetOrCreateForManager(manager.Id);
                Task<Team> teamTask = _teamRepository.GetByManagerId(teamDto.ManagerId);
                team = await teamTask;
            }

            UserDto identity = await identityTask;
            IdentityUser userIdentity = await _identityRepository
                .QuerySingleAsync(i => i.Id == identity.Id);

            Limit globalLimit = await globalLimitTask;


            var employee = new Domain.Entity.LearningCalendar.Employee
            {
                Id = Guid.NewGuid(),
                Identity = userIdentity,
                Team = team,
                Limit = globalLimit
            };

            await _employeeRepository.CreateAsync(employee);

            return new EmployeeDto();
        }
    }
}