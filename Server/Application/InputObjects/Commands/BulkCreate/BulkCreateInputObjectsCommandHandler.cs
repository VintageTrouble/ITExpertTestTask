using Core;

using Infrastructure.EntityFramework.Abstractions;

using MediatR;

namespace Application.InputObjects.Commands.BulkCreate
{
    public class BulkCreateInputObjectsCommandHandler : IRequestHandler<BulkCreateInputObjectsCommand>
    {
        private readonly IApplicationContext _context;

        public BulkCreateInputObjectsCommandHandler(IApplicationContext context)
        {
            _context = context;
        }

        public async Task Handle(BulkCreateInputObjectsCommand request, CancellationToken cancellationToken)
        {
            var inputCollection = request.InputObjects
                .Select(x => new InputObject { Code = x.Code, Value = x.Value })
                .OrderBy(x => x.Code);


            await _context.TruncateTable<InputObject>(cancellationToken);
            await _context.InputObjects.AddRangeAsync(inputCollection, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
