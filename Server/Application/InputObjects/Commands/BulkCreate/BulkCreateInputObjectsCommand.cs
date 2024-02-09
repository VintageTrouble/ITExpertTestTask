using Application.InputObjects.Contracts;

using MediatR;

namespace Application.InputObjects.Commands.BulkCreate;

public record BulkCreateInputObjectsCommand(IEnumerable<InputObjectRequest> InputObjects) : IRequest;