function solution(target) {
    const LIMIT = 20;
    const BULL = 50;
    
    const scores = [BULL];
    for (let i = 1; i <= LIMIT; i++) {
        scores.push(i);
        if (i * 2 > LIMIT) scores.push(i * 2);
        if (i * 3 > LIMIT * 2 || (i * 3 > LIMIT && i % 2 !== 0)) scores.push(i * 3);
    }
    scores.sort((a, b) => b - a);
    
    const bfs = () => {
        let head = 0;
        const queue = [[0, 0, 0, 0]];
        const count = Array.from(Array(target + 1), () => Array(3).fill(Infinity));
        const sum = (acc, cur) => acc + cur;
        
        while (queue.length - head) {
            const [cur, ...curN] = queue[head++];
            const curNTotal = curN.reduce(sum, 0);
            
            for (let score of scores) {
                if (cur + score > target) continue;
                
                const next = cur + score;
                const nextN = [...curN];
                const nextNTotal = curNTotal + 1;

                if (score <= LIMIT) nextN[0] += 1;
                else if (score === BULL) nextN[1] += 1;
                else nextN[2] += 1;
                
                const prevN = count[next];
                const prevNTotal = prevN.reduce(sum, 0);
                
                if (prevNTotal < nextNTotal) continue;
                if (prevNTotal === nextNTotal && prevN[0] + prevN[1] >= nextN[0] + nextN[1]) continue;
                
                count[next] = nextN;
                queue.push([next, ...nextN]);
            }
        }
            
        return count[target];
    }
    
    const [nSingle, nBell, nRest] = bfs();
    
    return [nSingle + nBell + nRest, nSingle + nBell];
}
