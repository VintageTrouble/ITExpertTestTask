WITH CTE AS (
    SELECT Id, Dt,
           ROW_NUMBER() OVER (PARTITION BY Id ORDER BY Dt) AS rn,
           LEAD(Dt) OVER (PARTITION BY Id ORDER BY Dt) AS NextDt
    FROM Dates
)
SELECT Id, Dt AS StartDate, NextDt AS EndDate
FROM CTE
WHERE NextDt IS NOT NULL
ORDER BY Id, StartDate;