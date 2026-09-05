using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RumboNic.Infrastructure.Persistence;

namespace RumboNic.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public HealthController(
        ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var canConnect =
            await _context.Database
                .CanConnectAsync();

        return Ok(new
        {
            api = "RumboNic API",
            database = canConnect
                ? "Connected"
                : "Disconnected",
            timestamp =
                DateTime.UtcNow,
        });
    }
}