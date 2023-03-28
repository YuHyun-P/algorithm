function solution(n, m, x, y, queries) {
    const [LEFT, RIGHT, UP, DOWN] = [0, 1, 2, 3];
    const [MIN_X, MAX_X, MIN_Y, MAX_Y] = [0, 1, 2, 3];
    
    const range = [x, x, y, y];
    const isValidX = (x) => 0 <= x && x < n; 
    const isValidY = (y) => 0 <= y && y < m;
    const outOfBound = ([minX, maxX, minY, maxY]) => !isValidX(minX) || !isValidX(maxX) || !isValidY(minY) || !isValidY(maxY);

    for (let i = queries.length - 1; 0 <= i; i--) {
        if (outOfBound(range)) return 0;
        const [dir, offset] = queries[i];
        
        switch (dir) {
            case LEFT:
                range[MAX_Y] = Math.min(range[MAX_Y] + offset, m - 1);
                if (range[MIN_Y] !== 0) range[MIN_Y] = range[MIN_Y] + offset;
                break;
            case RIGHT:
                range[MIN_Y] = Math.max(range[MIN_Y] - offset, 0);
                if (range[MAX_Y] !== m - 1) range[MAX_Y] = range[MAX_Y] - offset;
                break;
            case UP:
                range[MAX_X] = Math.min(range[MAX_X] + offset, n - 1);
                if (range[MIN_X] !== 0) range[MIN_X] = range[MIN_X] + offset;
                break;
            case DOWN:
                range[MIN_X] = Math.max(range[MIN_X] - offset, 0);
                if (range[MAX_X] !== n - 1) range[MAX_X] = range[MAX_X] - offset;
                break;
        }
    }
    if (outOfBound(range)) return 0;

    const [minX, maxX, minY, maxY] = range;
    return BigInt(maxX - minX + 1) * BigInt(maxY - minY + 1);
}