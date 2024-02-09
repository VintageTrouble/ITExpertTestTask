using Core;

using Microsoft.EntityFrameworkCore;

namespace Infrastructure.EntityFramework.Abstractions;

public interface IApplicationContext
{
    DbSet<InputObject> InputObjects { get; set; }

    Task TruncateTable<T>(CancellationToken cancellationToken = default) where T : class;

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
