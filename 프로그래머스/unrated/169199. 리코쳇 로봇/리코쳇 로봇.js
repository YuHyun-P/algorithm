function solution(board) {
    const ROBOT = 'R';
    const GOAL = 'G';
    const BLOCK = 'D';
    
    const ROW = board.length;
    const COL = board[0].length;
    
    let robot = null;
    let goal = null;
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];
    const count = Array.from(Array(ROW), () => Array(COL).fill(Infinity));
    
    const outOfBound = (r, c) => r < 0 || c < 0 || ROW <= r || COL <= c;
    
    for (let i = 0; i < ROW * COL; i++) {
        if (robot && goal) break;
        
        const [r, c] = [Math.floor(i / COL), i % COL];
        switch (board[r][c]) {
            case ROBOT:
                robot = [r, c];
                count[r][c] = 0;
                break;
            case GOAL:
                goal = [r, c];
                break;
        }
    }
    
    const bfs = () => {
        let head = 0;
        const queue = [[...robot]];
        
        while (queue.length - head) {
            const [curR, curC] = queue[head++];
            
            for (let dir = 0; dir < dr.length; dir++) {
                let nextR = curR;
                let nextC = curC;
                const nextCount = count[curR][curC] + 1;
                
                while (
                    !outOfBound(nextR + dr[dir], nextC + dc[dir]) &&
                    board[nextR + dr[dir]][nextC + dc[dir]] !== BLOCK
                ) {
                    nextR += dr[dir];
                    nextC += dc[dir];
                }
                
                if (nextR === curR && nextC === curC) continue;
                if (count[nextR][nextC] <= nextCount) continue;
                
                count[nextR][nextC] = nextCount;
                queue.push([nextR, nextC]);
            }
        }
    };
    
    bfs();
    const answer = count[goal[0]][goal[1]];
    return answer === Infinity ? -1 : answer;
}