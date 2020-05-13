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
        Task DeleteAsync(IEnumerable<TEntity> entities);
        Task UpdateAsync(TEntity entity);
        Task UpdateAsync(IEnumerable<TEntity> entities);
        Task<List<TEntity>> QueryAsync(Expression<Func<TEntity, bool>> predicate);
        Task<List<TEntity>> ListAsync();
        Task<TEntity> QuerySingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> QuerySingleAsync(Expression<Func<TEntity, bool>> predicate);
    }
}