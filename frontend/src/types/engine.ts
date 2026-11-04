export interface SearchResult
{
    targetSku: number;
    found: boolean;
    index: number;
    elapsedTicks: number;
    elapsedMilliseconds: number;
    comparisonsCount: number;
    algorithmUsed: string;
}

export interface AmortizationResult
{
    totalSkus: number;
    totalQueries: number;
    linearTotalOperations: number;
    amortizedTotalOperations: number;
    isStrategyBBetter: boolean;
    operationsSavedRatio: number;
}