using System;

namespace Epicenter.Domain.Entity.Team
{
    public class Employee : IEntity
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}