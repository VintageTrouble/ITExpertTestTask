using Application.Extensions;
using Application.InputObjects.Contracts;
using Core;

using Infrastructure.EntityFramework.Abstractions;

using MediatR;

using System.Linq.Expressions;

namespace Application.InputObjects.Queries.Read;

public class ReadInputObjectsQueryHandler : IRequestHandler<ReadInputObjectsQuery, PagedList<InputObjectResponse>>
{
    private readonly IApplicationContext _context;

    public ReadInputObjectsQueryHandler(IApplicationContext context)
    {
        _context = context;
    }

    public async Task<PagedList<InputObjectResponse>> Handle(ReadInputObjectsQuery request, CancellationToken cancellationToken)
    {
        IQueryable<InputObject> query = _context.InputObjects;

        if (request.CodeFilter.HasValue)
            query = query.Where(x => x.Code == request.CodeFilter.Value);

        if (!string.IsNullOrWhiteSpace(request.ValueFilter))
            query = query.Where(x =>
                x.Value.ToLower().StartsWith(
                    request.ValueFilter.ToLower()));

        query = request.SortOrder?.ToLower() == "desc"
            ? query.OrderByDescending(GetSortProperty(request))
            : (IQueryable<InputObject>)query.OrderBy(GetSortProperty(request));

        var responsesQuery = query
            .Select(x => new InputObjectResponse(
                x.Id,
                x.Code,
                x.Value));

        var inputObjects = await PagedList<InputObjectResponse>.CreateAsync(
            responsesQuery,
            request.Page, 
            request.PageSize);

        return inputObjects;
    }

    private static Expression<Func<InputObject, object>> GetSortProperty(ReadInputObjectsQuery request)
    {
        return request.SortColumn?.ToLower() switch
        {
            "code" => io => io.Code,
            "value" => io => io.Value,
            _ => io => io.Id
        };
    }
}
