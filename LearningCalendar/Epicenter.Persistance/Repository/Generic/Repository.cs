using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Epicenter.Domain.Entity;
using Epicenter.Persistence.Context;
using Epicenter.Persistence.Interface.Repository.Generic;
using Microsoft.EntityFrameworkCore;

namespace Epicenter.Persistence.Repository.Generic
{
    public class Repository<TEntity> : IRepository<TEntity>
        where TEntity : class, IEntity
    {

        protected EpicenterDbContext DbContext { get; set; }

        public Repository(EpicenterDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public async Task CreateAsync(TEntity entity)
        {
            await DbContext.Set<TEntity>().AddAsync(entity);
        }

        public Task DeleteAsync(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateAsync(TEntity entity)
        {
            DbContext.Update(entity);
            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(IEnumerable<TEntity> entities)
        {
            DbContext.UpdateRange(entities);
            await DbContext.SaveChangesAsync();
        }

        public async Task<List<TEntity>> Query(Expression<Func<TEntity, bool>> predicate)
        {
            return await DbContext.Set<TEntity>()
                .AsQueryable().Where(predicate).ToListAsync();
        }

        public async Task<List<TEntity>> List()
        {
            return await DbContext.Set<TEntity>().ToListAsync();
        }
    }
}