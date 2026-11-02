namespace SpeedRaceEngine.Api.Services;

using SpeedRaceEngine.Api.Models;

public interface ISearchEngineService
{
    void InitializeCatalog(int size = 1_000_000);
    SearchResult SearchLinear(int targetSku);
    SearchResult SearchBinary(int targetSku);
    void ShuffleCatalog();
    AmortizationResult CalculateAmortization(int kQueries);
}