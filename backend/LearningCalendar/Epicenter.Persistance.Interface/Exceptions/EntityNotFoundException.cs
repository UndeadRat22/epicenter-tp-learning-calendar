using System;

namespace Epicenter.Persistence.Interface.Exceptions
{
    public class EntityNotFoundException : PersistenceException
    {
        public EntityNotFoundException(Type type) 
            : base($"Entity of type '{type.Name}' was not found") { }
    }
}