using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Epicenter.Infrastructure.Extensions;

namespace Epicenter.Domain.Entity.LearningCalendar
{
    public class Team
    {
        public Guid Id { get; set; }
        [Required]
        public Employee Manager { get; set; }
        public List<Employee> Employees { get; set; }

        public bool IsInEmployeesSubTree(Guid employeeId)
        {
            if (Manager.Id == employeeId)
            {
                return true;
            }

            if (Manager.Team == null)
            {
                return false;
            }

            return Manager.Team.IsInEmployeesSubTree(employeeId);
        }

        public List<Employee> GetAllEmployees()
        {
            return this.Flatten(team => team.Employees.Select(employee => employee.ManagedTeam))
                .Where(team => team != null)
                .SelectMany(team => team.Employees)
                .Concat(new List<Employee> { Manager })
                .ToList();
        }

        public List<Employee> GetDirectSubordinates()
        {
            return Employees.Concat(new[] {Manager}).ToList();
        }
    }
}