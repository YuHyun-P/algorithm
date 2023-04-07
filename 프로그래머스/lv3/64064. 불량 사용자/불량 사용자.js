function solution(user_id, banned_id) {
    const N = banned_id.length;
    const set = new Set();
    const sanctions = banned_id.map((pattern) => {
        const regexp = new RegExp(`^${pattern.replaceAll('*', '.')}$`);
        const filtered = [];
        user_id.forEach((id, index) => {
            if (!regexp.test(id)) return;
            filtered.push(index);
        })
        return filtered;
    });
    
    const dfs = (level, visited) => {
        if (level === N) {
            set.add(visited);
            return;
        }
        
        for (const index of sanctions[level]) {
            if (visited & (1 << index)) continue;
            dfs(level + 1, visited | (1 << index));
        }
    }
    dfs(0, 0);
    return set.size;
}