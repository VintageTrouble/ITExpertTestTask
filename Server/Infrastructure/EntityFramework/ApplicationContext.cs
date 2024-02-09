using Core;

using Infrastructure.EntityFramework.Abstractions;

using Microsoft.EntityFrameworkCore;

namespace Infrastructure.EntityFramework;

public class ApplicationContext : DbContext, IApplicationContext
{
    public virtual DbSet<InputObject> InputObjects { get; set; }

    public ApplicationContext(DbContextOptions<ApplicationContext> options) 
        : base(options) { }

    public async Task TruncateTable<T>(CancellationToken cancellationToken = default) where T : class
    {
        var tableName = Set<T>().EntityType.GetSchemaQualifiedTableName();
        await Database.ExecuteSqlRawAsync($"DELETE FROM {tableName}", cancellationToken);
        await Database.ExecuteSqlRawAsync($"UPDATE `sqlite_sequence` SET `seq` = 0 WHERE `name` = '{tableName}';", cancellationToken);
    }
}
