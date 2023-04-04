function solution(N, number) {
    const MAX = 8;
    
    const set = new Set();
    const dp = Array.from(Array(MAX + 1), () => new Set());
    const ops = [
        (a, b) => a + b,
        (a, b) => a * b,
        (a, b) => Math.floor(a / b),
        (a, b) => Math.floor(b / a),
        (a, b) => a - b,
        (a, b) => b - a
    ];
    
    for (let i = 0; i < dp.length; i++) {
        const cur = Number(`${N}`.repeat(i));
        set.add(cur);
        dp[i].add(cur);
    }
    
    for (let i = 2; i < dp.length; i++) {
        for (let j = 1; j <= i / 2; j++) {
            for (const a of [...dp[j]]) {
                for (const b of [...dp[i - j]]) {
                    for (const op of ops) {
                        const next = op(a, b);
                        if (set.has(next)) continue;
                        set.add(next);
                        dp[i].add(next);
                    }
                }
            } 
        }
    }
    
    return dp.findIndex((numbers) => numbers.has(number));
}