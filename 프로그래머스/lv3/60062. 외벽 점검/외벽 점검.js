function solution(n, weak, dist) {
    const cache = Array.from(Array(dist.length), () => Array(1 << weak.length).fill(-1));
    const dfs = (friend, fixed) => {
        if (friend === dist.length) {
            if (fixed === (1 << weak.length) - 1) return 0
            return Infinity;
        }
        if (cache[friend][fixed] > 0) return cache[friend][fixed];
        
        let min = Infinity;
        for (const [index, start] of weak.entries()) {
            if (fixed & (1 << index) === 0) continue;
            
            let cur = index;
            let restDist = Math.min(dist[friend], n);
            let nextFixed = fixed;
            while (restDist >= 0) {
                nextFixed |= (1 << cur);
                const next = (cur + 1) % weak.length;
                if (weak[next] < weak[cur]) restDist -= (n + weak[next]) - weak[cur];
                else restDist -= weak[next] - weak[cur];
                cur = next;
            }
            min = Math.min(min, dfs(friend + 1, nextFixed) + 1);
        }
        min = Math.min(min, dfs(friend + 1, fixed));
        cache[friend][fixed] = min;
        return min;
    };
    
    const min = dfs(0, 0);
    return min === Infinity ? -1 : min;
}