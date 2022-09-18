function solution(a, edges) {
    const graph = Array.from(Array(a.length), () => []);
    edges.forEach(([u, v]) => {
        graph[u].push(v);
        graph[v].push(u);
    });
    
    const bottomUp = [...a];
    let count = 0n;
    const dfs = (start) => {
        const visited = Array(a.length).fill(false);
        const stack = [[null, start]];
        
        while (stack.length > 0) {
            const [curParent, curNode] = stack.pop();
            
            if (visited[curNode]) {
                if (curParent !== null) {
                    count += BigInt(Math.abs(bottomUp[curNode]));
                    
                    bottomUp[curParent] += bottomUp[curNode];
                    bottomUp[curNode] = 0;
                }
                continue;
            }
            
            visited[curNode] = true;
            stack.push([curParent, curNode]);
            
            graph[curNode].forEach((nextNode) => {
                if (visited[nextNode]) return;
                
                stack.push([curNode, nextNode]);
            })
        }
        
    }
    dfs(0);    
    
    return bottomUp[0] === 0 ? count : -1;
}