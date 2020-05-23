using System;

namespace Epicenter.Service.Interface.Exceptions.Employee
{
    public class EmployeeHasSubordinatesException : ApplicationException
    {
        public EmployeeHasSubordinatesException(Guid id) : base(
            $"Cannot delete employee '{id}' because he has subordinates")
        {

        }
    }
}