namespace SpeedRaceEngine.Api.Services;

using System.Diagnostics;
using SpeedRaceEngine.Api.Models;

public class SearchEngineService : ISearchEngineService
{
    private int[] _skus = Array.Empty<int>();

    public void InitializeCatalog(int size = 1_000_000)
    {
        _skus = new int[size];
        for (int i = 0; i < size; i++)
        {
            _skus[i] = i + 1;
        }
    }

    public SearchResult SearchLinear(int targetSku)
    {
        long comparisons = 0;
        var stopwatch = Stopwatch.StartNew();
        int foundIndex = -1;

        for (int i = 0; i < _skus.Length; i++)
        {
            comparisons++;
            if (_skus[i] == targetSku)
            {
                foundIndex = i;
                break;
            }
        }

        stopwatch.Stop();

        return new SearchResult
        (
            targetSku,
            foundIndex != -1,
            foundIndex,
            stopwatch.ElapsedTicks,
            stopwatch.Elapsed.TotalMilliseconds,
            comparisons,
            "Linear Search"
        );
    }

    public SearchResult SearchBinary(int targetSku)
    {
        long comparisons = 0;
        var stopwatch = Stopwatch.StartNew();
        int foundIndex = -1;

        int left = 0;
        int right = _skus.Length - 1;

        while (left <= right)
        {
            int mid = left + (right - left) / 2;
            comparisons++;

            if (_skus[mid] == targetSku)
            {
                foundIndex = mid;
                break;
            }

            if (_skus[mid] < targetSku)
            {
                left = mid + 1;
            }

            else
            {
                right = mid - 1;
            }
        }

        stopwatch.Stop();

        return new SearchResult
        (
            targetSku,
            foundIndex != -1,
            foundIndex,
            stopwatch.ElapsedTicks,
            stopwatch.Elapsed.TotalMilliseconds,
            comparisons,
            "Binary Search"
        );
    }

    public void ShuffleCatalog()
    {
        Random random = Random.Shared;
        for (int i = _skus.Length - 1; i >= 1; i--)
        {
            int j = random.Next(i + 1);
            int temp = _skus[i];
            _skus[i] = _skus[j];
            _skus[j] = temp;
        }
    }

    public AmortizationResult CalculateAmortization(int kQueries)
    {
        int n = _skus.Length > 0 ? _skus.Length : 1_000_000;
        double log2N = Math.Log2(n);

        long linearOps = (long)kQueries * n;
        long amortizedOps = (long)(n * log2N) + (long)(kQueries * log2N);

        bool isBetter = amortizedOps < linearOps;
        double savedRatio = linearOps > 0 ? (double)(linearOps - amortizedOps) / linearOps * 100 : 0;

        return new AmortizationResult
        (
            n,
            kQueries,
            linearOps,
            amortizedOps,
            isBetter,
            savedRatio
        );
    }
}