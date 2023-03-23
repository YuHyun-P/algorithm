function solution(alp, cop, problems) {
    let alpMax = alp;
    let copMax = cop;
    problems.forEach(([alpReq, copReq]) => {
        alpMax = Math.max(alpMax, alpReq);
        copMax = Math.max(copMax, copReq);
    });
    
    const minCost = Array.from(Array(alpMax + 1), () => Array(copMax + 1).fill(Infinity));
    minCost[alp][cop] = 0;
    
    const updateMinCost = (r, c, value) => {
        r = Math.min(r, alpMax);
        c = Math.min(c, copMax);
        if (minCost[r][c] <= value) return;
        minCost[r][c] = value;
    };
    
    const ascendingAlpReq = (a, b) => a[0] - b[0];
    problems.sort(ascendingAlpReq);
    
    for (let curAlp = alp; curAlp <= alpMax; curAlp++) {
        for (let curCop = cop; curCop <= copMax; curCop++) {
            const curCost = minCost[curAlp][curCop];
            if (curCost === Infinity) continue;
            
            updateMinCost(curAlp + 1, curCop, curCost + 1);
            updateMinCost(curAlp, curCop + 1, curCost + 1);
            
            for (const [alpReq, copReq, alpRwd, copRwd, cost] of problems) {
                if (curAlp < alpReq) break;
                if (curCop < copReq) continue;
                
                updateMinCost(curAlp + alpRwd, curCop + copRwd, curCost + cost);
            }
        }
    }
    
    return minCost[alpMax][copMax];
}