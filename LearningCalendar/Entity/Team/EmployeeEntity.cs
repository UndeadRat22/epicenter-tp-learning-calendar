using System;

namespace Epicenter.Domain.Entity.Team
{
    public class EmployeeEntity : IEntity
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}