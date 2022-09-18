function solution(grid) {
    const DIRECTION = 4;
    // right down left up
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];
    
    const N = grid.length;
    const M = grid[0].length;
    const visited = Array.from(
        Array(N), 
        () => Array.from(
            Array(M),
            () => Array(DIRECTION).fill(false)
        )
    );
    
    const dfs = (r, c, direction) => {
        const stack = [[r, c, direction]];
        let count = 0;
        
        while (stack.length > 0) {
            const [curR, curC, curDirection] = stack.pop();
            const cell = grid[curR][curC];
            count++;
            
            let nextR, nextC, nextDirection;
            switch (cell) {
                case "S":
                    nextDirection = curDirection;
                    nextR = (curR + dr[nextDirection] + N) % N;
                    nextC = (curC + dc[nextDirection] + M) % M;
                    break;
                case "L":
                    nextDirection = (curDirection + 1) % DIRECTION;
                    nextR = (curR + dr[nextDirection] + N) % N;
                    nextC = (curC + dc[nextDirection] + M) % M;
                    break;
                case "R":
                    nextDirection = (curDirection - 1 + DIRECTION) % DIRECTION
                    nextR = (curR + dr[nextDirection] + N) % N;
                    nextC = (curC + dc[nextDirection] + M) % M;
                    break;
            }
            
            if (visited[nextR][nextC][nextDirection]) break;
            
            stack.push([nextR, nextC, nextDirection]);
            visited[nextR][nextC][nextDirection] = true;
        }
        
        return count;
    }
    
    const lengths = [];
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < M; c++) {
            for (let direction = 0; direction < DIRECTION; direction++) {
                if (visited[r][c][direction]) continue;
                
                visited[r][c][direction] = true;
                const length = dfs(r, c, direction);
                lengths.push(length);
            }
        }
    }
    return lengths.sort((a, b) => a - b)
}