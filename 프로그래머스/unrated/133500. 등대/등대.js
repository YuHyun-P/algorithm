function solution(n, lighthouse) {
    const on = Array(n + 1).fill(1);
    const off = Array(n + 1).fill(0);
    const tree = Array.from(Array(n + 1), () => []);
    for (const [u, v] of lighthouse) {
        tree[u].push(v);
        tree[v].push(u);
    }
    
    const stack = [[-1, 1, -1]];
    
    while (stack.length) {
        const [parent, cur, dir] = stack.pop();
        
        if (dir === -1) {
            stack.push([parent, cur, 1]);
            
            for (const child of tree[cur]) {
                if (child === parent) continue;
                stack.push([cur, child, -1]);
            }
            continue;
        }
        
        for (const child of tree[cur]) {
            if (child === parent) continue;
            on[cur] += Math.min(on[child], off[child]);
            off[cur] += on[child];
        }
    }

    return Math.min(on[1], off[1]);
}