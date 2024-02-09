using Application.Extensions;
using Application.InputObjects.Contracts;
using Core;

using MediatR;

namespace Application.InputObjects.Queries.Read;

public record ReadInputObjectsQuery(int? CodeFilter, string? ValueFilter, string? SortColumn, string? SortOrder, int Page, int PageSize) 
    : IRequest<PagedList<InputObjectResponse>>;
