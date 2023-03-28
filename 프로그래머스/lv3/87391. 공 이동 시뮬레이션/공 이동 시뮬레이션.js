function solution(n, m, x, y, queries) {
    const [LEFT, RIGHT, UP, DOWN] = [0, 1, 2, 3];
    const getDiff = (dir, offset) => {
        switch (dir) {
            case LEFT: return [0, 0, 0, offset];
            case RIGHT: return [0, 0, 0, -offset];
            case UP: return [0, offset, 0, 0];
            case DOWN: return [0, -offset, 0, 0];
        }
    };
    
    let count = 0;
    const dfs = (startX, startY, startQueryIndex) => {
        const stack = [[[startX, startX, startY, startY], startQueryIndex]];
        
        while (stack.length) {
            const [cur, queryIndex] = stack.pop();
            const [minX, maxX, minY, maxY] = cur;
            
            if (queryIndex < 0) {
                count += (maxX - minX + 1) * (maxY - minY + 1);
                continue;
            }
            
            const [dir, offset] = queries[queryIndex];
            const diff = getDiff(dir, offset);
                
            const next = cur.map((base, index) => {
                const sign = Math.sign(diff[index]);
                if (sign === 0) return base;
                if (sign < 0) return Math.max(0, base + diff[index]);
                return Math.min(base + diff[index], index < 2 ? m : n);
            });
            
            stack.push([next, queryIndex - 1]);
            console.log(cur, '-', [dir, offset], '-', next);
        }
    };
    
    dfs(x, y, queries.length - 1);
    return count;
}