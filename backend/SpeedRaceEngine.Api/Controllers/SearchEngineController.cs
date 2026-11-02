namespace SpeedRaceEngine.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using SpeedRaceEngine.Api.Models;
using SpeedRaceEngine.Api.Services;

[ApiController]
[Route("api/[controller]")]
public class SearchEngineController : ControllerBase
{
    private readonly ISearchEngineService _searchEngineService;

    public SearchEngineController(ISearchEngineService searchEngineService)
    {
        _searchEngineService = searchEngineService;
    }

    [HttpPost("initialize")]
    public IActionResult Initialize([FromQuery] int size = 1_000_000)
    {
        _searchEngineService.InitializeCatalog(size);
        return Ok(new { Message = $"Catálogo inicializado con {size:N0} SKUs ordenados en memoria RAM." });
    }

    [HttpGet("search/linear/{targetSku}")]
    public IActionResult SearchLinear(int targetSku)
    {
        SearchResult result = _searchEngineService.SearchLinear(targetSku);
        return Ok(result);
    }

    [HttpGet("search/binary/{targetSku}")]
    public IActionResult SearchBinary(int targetSku)
    {
        SearchResult result = _searchEngineService.SearchBinary(targetSku);
        return Ok(result);
    }

    [HttpPost("shuffle")]
    public IActionResult Shuffle()
    {
        _searchEngineService.ShuffleCatalog();
        return Ok(new { Message = "Catálogo mezclado aleatoriamente." });
    }

    [HttpGet("amortization/{kQueries}")]
    public IActionResult GetAmortization(int kQueries)
    {
        var amortizationResult = _searchEngineService.CalculateAmortization(kQueries);
        return Ok(amortizationResult);
    }
}