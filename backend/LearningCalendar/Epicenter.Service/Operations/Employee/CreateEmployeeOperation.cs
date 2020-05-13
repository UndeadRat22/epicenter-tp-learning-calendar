using System;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Domain.Entity.LearningCalendar.ValueObject;
using Epicenter.Infrastructure.Cryptography;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Exceptions.Authentication;
using Epicenter.Service.Interface.Operations.Employee;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Epicenter.Service.Operations.Employee
{
    public class CreateEmployeeOperation : ICreateEmployeeOperation
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ILimitRepository _limitRepository;
        private readonly IRepository<Role> _roleRepository;
        private readonly IEnsureManagerHasTeamOperation _ensureManagerHasTeamOperation;

        public CreateEmployeeOperation(IEmployeeRepository employeeRepository, ILimitRepository limitRepository, IRepository<Role> roleRepository, IEnsureManagerHasTeamOperation ensureManagerHasTeamOperation)
        {
            _employeeRepository = employeeRepository;
            _limitRepository = limitRepository;
            _roleRepository = roleRepository;
            _ensureManagerHasTeamOperation = ensureManagerHasTeamOperation;
        }

        public async Task<CreateEmployeeOperationResponse> Execute(CreateEmployeeOperationRequest request)
        {
            var identity = new IdentityUser
            {
                Email = request.Email,
                PasswordHash = Sha256Hash.Calculate(request.Password)
            };

            if (request.ManagerEmail == null)
            {
                var topLevelManager = await _employeeRepository.GetTopLevelManagerAsync();
                if (topLevelManager != null)
                {
                    return new CreateEmployeeOperationResponse();
                }
            }

            return await (request.ManagerEmail == null
                ? CreateTopLevelManager(identity, request)
                : CreateEmployee(identity, request));
        }

        private async Task<CreateEmployeeOperationResponse> CreateEmployee(IdentityUser identityUser, CreateEmployeeOperationRequest request)
        {
            var roleTask = _roleRepository
                .QuerySingleOrDefaultAsync(role => role.Title == request.Role);

            var managerId = (await _employeeRepository.GetByEmailAsync(request.ManagerEmail)).Id;

            var getTeamResponse = await _ensureManagerHasTeamOperation.Execute(new EnsureManagerHasTeamRequest{ ManagerId = managerId });

            Role role = await roleTask;

            var employee = new Domain.Entity.LearningCalendar.Employee
            {
                Identity = identityUser, 
                Team = new Domain.Entity.LearningCalendar.Team{ Id = getTeamResponse.TeamId },
                FirstName = request.FirstName,
                LastName = request.LastName,
                Image = new Image
                {
                    Value = request.ImageData
                },
                Role = role ?? new Role
                {
                    Title = request.Role
                }
            };
            
            var limit = await _limitRepository.GetGlobalAsync();
            limit.Employees.Add(employee);

            try
            {
                await _limitRepository.UpdateAsync(limit);
            }
            catch (DbUpdateException)
            {
                throw new EmailAlreadyUseException();
            }

            return new CreateEmployeeOperationResponse();
        }

        private async Task<CreateEmployeeOperationResponse> CreateTopLevelManager(IdentityUser identityUser, CreateEmployeeOperationRequest request)
        {

            try
            {
                var employee = new Domain.Entity.LearningCalendar.Employee
                {
                    Identity = identityUser,
                    Limit = new Domain.Entity.LearningCalendar.Limit(),
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Image = new Image
                    {
                        Value = request.ImageData
                    },
                    Role = new Role
                    {
                        Title = Constants.Employee.TopLevelManagerRole
                    }
                };

                await _employeeRepository.CreateAsync(employee);
            }
            catch (DbUpdateException)
            {
                throw new EmailAlreadyUseException();
            }

            return new CreateEmployeeOperationResponse();
        }

    }
}