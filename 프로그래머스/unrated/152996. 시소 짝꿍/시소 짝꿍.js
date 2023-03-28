function solution(weights) {
    const [MIN, MAX] = [100, 1000];
    const DISTANCE = [2, 3, 4];
    
    const N = weights.length;
    const map = new Map();
    const count = Array(MAX - MIN + 1).fill(0);
    let nPair = 0;
    
    weights.forEach((w, i) => {
        count[w - MIN] += 1;
        nPair += count[w - MIN] - 1;
            
        DISTANCE.forEach((d) => {
            if (map.has(d * w)) map.get(d * w).add(w - MIN);
            else map.set(d * w, new Set([w - MIN]));
        });
    });
    
    
    for (const [_, indices] of map) {
        if (indices.size < 2) continue;
        const nSame = [...indices].reduce((acc, index) => acc + count[index], 0);
        const nDuplicated = [...indices].reduce((acc, index) => acc + (count[index] * (count[index] - 1)) / 2, 0);
        nPair += (nSame * (nSame - 1)) / 2 - nDuplicated;
    }

    return nPair;
}