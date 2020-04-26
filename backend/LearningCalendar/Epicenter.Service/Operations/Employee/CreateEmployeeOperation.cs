using System;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Domain.Entity.LearningCalendar.ValueObject;
using Epicenter.Infrastructure.Cryptography;
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
        private readonly ITeamRepository _teamRepository;
        private readonly IEnsureManagerHasTeamOperation _ensureManagerHasTeamOperation;

        public CreateEmployeeOperation(IEmployeeRepository employeeRepository, ILimitRepository limitRepository, ITeamRepository teamRepository, IEnsureManagerHasTeamOperation managerHasTeamOperation)
        {
            _employeeRepository = employeeRepository;
            _limitRepository = limitRepository;
            _teamRepository = teamRepository;
            _ensureManagerHasTeamOperation = managerHasTeamOperation;
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
                    return new CreateEmployeeOperationResponse { };
                }
            }

            return await (request.ManagerEmail == null
                ? CreateManager(identity, request)
                : CreateEmployee(identity, request));

        }

        private async Task<CreateEmployeeOperationResponse> CreateEmployee(IdentityUser identityUser, CreateEmployeeOperationRequest request)
        {
            var managerId = (await _employeeRepository.GetByEmailAsync(request.ManagerEmail)).Id;

            var getTeamResponse = await _ensureManagerHasTeamOperation.Execute(new EnsureManagerHasTeamRequest{ ManagerId = managerId });

            var employee = new Domain.Entity.LearningCalendar.Employee
            {
                Identity = identityUser, 
                Team = new Domain.Entity.LearningCalendar.Team{ Id = getTeamResponse.TeamId },
                FirstName = request.FirstName,
                LastName = request.LastName,
                Image = new Image
                {
                    Value = request.ImageData
                }
            };
            
            Limit limit = await _limitRepository.GetGlobalAsync();
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

        private async Task<CreateEmployeeOperationResponse> CreateManager(IdentityUser identityUser, CreateEmployeeOperationRequest request)
        {

            try
            {
                var employee = new Domain.Entity.LearningCalendar.Employee
                {
                    Identity = identityUser,
                    Limit = new Limit(),
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Image = new Image
                    {
                        Value = request.ImageData
                    }
                };

                await _employeeRepository.CreateAsync(employee);
            }
            catch (DbUpdateException e)
            {
                throw new EmailAlreadyUseException();
            }

            return new CreateEmployeeOperationResponse();
        }

    }
}