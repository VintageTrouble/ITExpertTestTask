using Application.InputObjects.Commands.BulkCreate;
using Application.InputObjects.Contracts;
using Application.InputObjects.Queries.Read;

using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InputObjectsController : ControllerBase
{
    private readonly ISender _sender;
    
    public InputObjectsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost("/inputobjects")]
    public async Task<IActionResult> SaveObjects([FromBody] IEnumerable<InputObjectRequest> inputObjects)
    {
        await _sender.Send(new BulkCreateInputObjectsCommand(inputObjects));
        
        return Ok();
    }

    [HttpGet("/inputobjects")]
    public async Task<IActionResult> GetObjects(int? codeFilter, string? valueFilter, string? sortColumn, string? sortOrder, int page = 1, int pageSize = 10)
    {
        var result = await _sender.Send(
            new ReadInputObjectsQuery(
                codeFilter, 
                valueFilter, 
                sortColumn, 
                sortOrder,
                page, 
                pageSize));

        return Ok(result);
    }
}
