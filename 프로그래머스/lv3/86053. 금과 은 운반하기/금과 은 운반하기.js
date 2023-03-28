function solution(a, b, g, s, w, t) {
    const MAX_T = 10 ** 5;
    const MAX_MATERIAL = 10 ** 9;
    const MAX_TOTAL_T = MAX_MATERIAL * MAX_T * 2 * 2;
    const N = g.length;

    const compare = (time) => {
        let goldMax = 0;
        let silverMax = 0;
        let total = 0;

        for (let i = 0; i < N; i++) {
            if (t[i] > time) continue;
            
            const nMove = Math.floor(time / t[i]);
            const nOneWay = Math.ceil(nMove / 2);
            const wTotal = nOneWay * w[i];
            
            total += Math.min(wTotal, g[i] + s[i]);
            goldMax += Math.min(g[i], wTotal);
            silverMax += Math.min(s[i], wTotal);
            
            const canBuild = a <= goldMax && b <= silverMax && a + b <= total;
            if (canBuild) return 1;
        }
        
        return -1;
    };
    
    const lowerBound = () => {
        let low = 0;
        let high = MAX_TOTAL_T;
        while (low + 1 < high) {
            const mid = Math.floor((low + high) / 2);
            if (compare(mid) < 0) {
                low = mid;
            } else {
                high = mid;   
            }
        }
        return high;
    };
    
    return lowerBound();
}