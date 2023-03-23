function solution(n, paths, gates, summits) {
    const SUMMIT = 0;
    const INTENSITY = 1;
    
    const graph = Array.from(Array(n + 1), () => []);
    paths.forEach(([i, j, w]) => {
        graph[i].push([j, w]);
        graph[j].push([i, w]);
    });
    
    const gatesSet = new Set(gates);
    const isGate = (v) => gatesSet.has(v);
    
    let head = 0;
    const queue = [];
    const vMin = Array.from(Array(n + 1), () => Array(2).fill(Infinity));
    summits.forEach((summit) => {
        queue.push([summit, summit, 0]);
        vMin[summit][0] = summit;
        vMin[summit][1] = 0;
    });
    
    while (queue.length - head) {
        const [curV, curSummit, curIntensity] = queue[head++];
        
        for (const [nextV, w] of graph[curV]) {
            const nextIntensity = Math.max(curIntensity, w);
            
            const [prevSummit, prevIntensity] = vMin[nextV];
            if (prevIntensity < nextIntensity) continue;
            if (prevIntensity === nextIntensity && prevSummit <= curSummit) continue;
            
            vMin[nextV][SUMMIT] = curSummit;
            vMin[nextV][INTENSITY] = nextIntensity;
            
            if (isGate(nextV)) continue;
            queue.push([nextV, curSummit, nextIntensity]);
        }
    }
    
    const gatesMin = vMin.filter((_, i) => isGate(i));
    gatesMin.sort((a, b) => a[INTENSITY] - b[INTENSITY] || a[SUMMIT] - b[SUMMIT]);
    
    return gatesMin[0];
}