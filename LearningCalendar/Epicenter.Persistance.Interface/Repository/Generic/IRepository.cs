using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Epicenter.Persistence.Interface.Repository.Generic
{
    public interface IRepository<TEntity>
    {
        Task CreateAsync(TEntity entity);
        Task DeleteAsync(TEntity entity);
        Task UpdateAsync(TEntity entity);
        Task UpdateAsync(IEnumerable<TEntity> entities);
        Task<List<TEntity>> Query(Expression<Func<TEntity, bool>> predicate);
        Task<List<TEntity>> List();
    }
}