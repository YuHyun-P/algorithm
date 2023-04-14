function solution(rectangle, characterX, characterY, itemX, itemY) {
    const MAX = 101;
    const [OUTER, LINE, INNER] = [-1, 0, 1];

    const extended = Array.from(Array(MAX), () => Array(MAX).fill(OUTER));
    const extendedRectangle = rectangle.map((coord) => {
        const [minX, minY, maxX, maxY] = coord.map((num) => num * 2);
        const [minR, maxR] = [MAX - maxY, MAX - minY];
        const [minC, maxC] = [minX, maxX];
        return [minR, minC, maxR, maxC];
    });
    
    extendedRectangle.forEach(([minR, minC, maxR, maxC]) => {
        for (let r = minR; r <= maxR; r++) {
            for (let c = minC; c <= maxC; c++) {
                extended[r][c] = LINE;
            }
        }
    });
    extendedRectangle.forEach(([minR, minC, maxR, maxC]) => {
        for (let r = minR + 1; r < maxR; r++) {
            for (let c = minC + 1; c < maxC; c++) {
                extended[r][c] = INNER;
            }
        }
    });
    
    const outOfBound = (r, c) => r < 0 || c < 0 || MAX <= r || MAX <= c;
    const bfs = (startR, startC) => {
        const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        
        let head = 0;
        const queue = [[startR, startC]];
        const distance = Array.from(Array(MAX), () => Array(MAX).fill(Infinity));
        distance[startR][startC] = 0;
        
        while (queue.length - head) {
            const [r, c] = queue[head++];
            for (const [dr, dc] of direction) {
                const [nr, nc] = [r + dr, c + dc];
                if (outOfBound(nr, nc)) continue;
                if (distance[nr][nc] !== Infinity) continue;
                if (extended[nr][nc] !== LINE) continue;
                
                distance[nr][nc] = distance[r][c] + 1;
                queue.push([nr, nc]);
            }
        }
        
        return distance;
    };

    const distance = bfs(MAX - characterY * 2, characterX * 2);
    return distance[MAX - itemY * 2][itemX * 2] / 2;
}