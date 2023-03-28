function solution(maps) {
    const [N, M] = [maps.length, maps[0].length];
    const DIRECTION = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const [start, exit, lever, wall] = ['S', 'E', 'L', 'X'];
    
    let startPos = null;
    let exitPos = null;
    let leverPos = null;
    
    const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || M <= c;
    const bfs = (startR, startC) => {
        let head = 0;
        const queue = [[startR, startC]];
        const distance = Array.from(Array(N), () => Array(M).fill(Infinity));
        distance[startR][startC] = 0;
        
        while (queue.length - head) {
            const [r, c] = queue[head++];
            
            for (const [dr, dc] of DIRECTION) {
                const [nextR, nextC] = [r + dr, c + dc];
                if (outOfBound(nextR, nextC)) continue;
                if (maps[nextR][nextC] === wall) continue;
                if (distance[nextR][nextC] !== Infinity) continue;
                
                distance[nextR][nextC] = distance[r][c] + 1;
                queue.push([nextR, nextC]);
            }
        }
        
        return distance;
    };
    
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < M; c++) {
            switch (maps[r][c]) {
                case start: 
                    startPos = [r, c];
                    break;
                case exit:
                    exitPos = [r, c];
                    break;
                case lever:
                    leverPos = [r, c];
                    break;
            }
        }
    }
    
    const minDistance = bfs(...leverPos);
    const startToLever = minDistance[startPos[0]][startPos[1]];
    const leverToExit = minDistance[exitPos[0]][exitPos[1]];
    const total = startToLever + leverToExit;
    return total === Infinity ? -1 : total;
}