using System;

namespace Epicenter.Api.Model.Team.Employee
{
    public class EmployeeModel
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ImageData { get; set; }
        public bool IsTopLevelManager { get; set; }
    }
}