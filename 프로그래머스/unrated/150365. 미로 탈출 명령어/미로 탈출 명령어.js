function solution(n, m, x, y, r, c, k) {
    const isPossible = (x, y, k) => {
        const least = Math.abs(x - r) + Math.abs(y - c);
        return least <= k && (k - least) % 2 === 0;
    }
    if (!isPossible(x, y, k)) return 'impossible';
    
    let found = false;
    const paths = [];
    const visited = Array.from(Array(n + 1), () => Array(m + 1).fill(false));
    const dir = [['d', 1, 0], ['l', 0, -1], ['r', 0, 1], ['u', -1, 0]];
    
    const outOfBound = (r, c) => r < 1 || c < 1 || n < r || m < c;
    const dfs = (curR, curC, path, revisit) => {
        if (found) return;
        if (!isPossible(curR, curC, k - path.length)) return;
        if (path.length === k) {
            if (curR === r && curC === c) {
                paths.push(path.join(''));
                found = true;
            }
            return;
        }
        
        for (const [char, dr, dc] of dir) {
            const nextR = curR + dr;
            const nextC = curC + dc;
            
            if (outOfBound(nextR, nextC)) continue;
            if (visited[nextR][nextC] && revisit === 0) continue;
            
            if (visited[nextR][nextC]) {
                path.push(char);
                dfs(nextR, nextC, path, revisit - 1);
                path.pop();
            } else {
                visited[nextR][nextC] = true;
                path.push(char);
                dfs(nextR, nextC, path, revisit);
                path.pop();
                visited[nextR][nextC] = false;
            }
        }
    };
    
    visited[x][y] = true;
    dfs(x, y, [], k - Math.abs(x - r) - Math.abs(y - c));
    return paths[0];
}