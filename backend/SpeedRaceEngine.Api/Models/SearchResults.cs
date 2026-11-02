namespace SpeedRaceEngine.Api.Models;

public record SearchResult
(
    int TargetSku,
    bool Found,
    int Index,
    long elapsedTicks,
    double ElapsedMilliseconds,
    long ComparisonsCount,
    string AlgorithmUsed
);

public record AmortizationResult
(
    int TotalSkus,
    int TotalQueries,
    long LinearTotalOperations,
    long AmortizedTotalOperations,
    bool IsStrategyBBetter,
    double OperationsSavedRatio
);