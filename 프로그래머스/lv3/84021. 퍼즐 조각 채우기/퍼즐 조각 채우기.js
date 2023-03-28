function solution(game_board, table) {
    const [FILL, EMPTY] = [1, 0];
    const [MIN, MAX] = [1, 6];
    const [N, M] = [table.length, table[0].length];
    
    const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || M <= c;
    const getShape = (startR, startC, visited, board) => {
        let [minR, maxR, minC, maxC] = [startR, startR, startC, startC];
        
        let head = 0;
        const queue = [[startR, startC]];
        visited[startR][startC] = true;
        
        while (queue.length - head) {
            const [r, c] = queue[head++];
            
            for (const [dr, dc] of direction) {
                const [nextR, nextC] = [r + dr, c + dc];
                if (outOfBound(nextR, nextC)) continue;
                if (visited[nextR][nextC]) continue;
                if (board[nextR][nextC] === EMPTY) continue;

                visited[nextR][nextC] = true;
                minR = Math.min(minR, nextR);
                maxR = Math.max(maxR, nextR);
                minC = Math.min(minC, nextC);
                maxC = Math.max(maxC, nextC);
                queue.push([nextR, nextC]);
            }
        }
        
        const [shapeR, shapeC] = [maxR - minR + 1, maxC - minC + 1];
        const shape = Array.from(Array(shapeR), () => Array(shapeC).fill(EMPTY));
        queue.forEach(([r, c]) => shape[r - minR][c - minC] = FILL);

        return [shape, queue.length];
    };
    const getRotations = (shape) => {
        const rotations = [shape];
        let tmp = shape.map((row) => [...row]);
        
        for (let iter = 90; iter < 360; iter += 90) {
            const [curR, curC] = [tmp.length, tmp[0].length];
            const rotated = Array.from(Array(curC), () => Array(curR).fill(EMPTY));
            
            for (let r = 0; r < curR; r++) {
                for (let c = 0; c < curC; c++) {
                    rotated[c][curR - r - 1] = tmp[r][c];
                }
            }
            
            rotations.push(rotated);
            tmp = rotated;
        }

        return rotations;
    };
    const getPuzzleMap = () => {
        const puzzleMap = new Map(Array.from(Array(MAX - MIN + 1), (_, i) => [i + 1, []]));
        const visited = Array.from(Array(N), () => Array(M).fill(false));
                                   
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < M; c++) {
                if (visited[r][c]) continue;
                if (table[r][c] === EMPTY) continue;
                
                const [shape, length] = getShape(r, c, visited, table);
                const rotations = getRotations(shape);
                puzzleMap.get(length).push({ used: false, rotations });
            }
        }
        return puzzleMap;
    };
    const toString = (shape) => {
      return shape.map((row) => row.join('')).join('\n');
    };
    
    let filled = 0;
    const puzzleMap = getPuzzleMap();
    const visited = Array.from(Array(N), () => Array(M).fill(false));
    const inverted = game_board.map((row) => row.map((col) => col === FILL ? EMPTY : FILL));
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < M; c++) {
            if (visited[r][c]) continue;
            if (inverted[r][c] === EMPTY) continue;

            const [shape, length] = getShape(r, c, visited, inverted);
            const puzzleList = puzzleMap.get(length);
            for (const puzzle of puzzleList) {
                const { used, rotations } = puzzle;
                if (used) continue;
                
                const canFill = rotations.some((cur) => toString(cur) === toString(shape));
                if (canFill) {
                    puzzle.used = true;
                    filled += length;
                    break;    
                }
            }
        }
    }
    
    return filled;
}