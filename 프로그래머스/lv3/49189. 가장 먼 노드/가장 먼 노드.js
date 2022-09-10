function solution(n, edge) {
    const graph = Array.from(
        Array(n + 1),
        () => []
    );
    
    edge.forEach(([a, b]) => {
        graph[a].push(b);
        graph[b].push(a);
    });
    
    const level = Array(n + 1).fill(Infinity);
    level[0] = -Infinity;
    level[1] = 0;
    const queue = [1];
    const visited = Array(n + 1).fill(false);
    visited[1] = true;
    
    while (queue.length > 0) {
        const a = queue.shift();
        const neighborhood = graph[a];
        
        neighborhood.forEach((b) => {
            level[b] = Math.min(level[b], level[a] + 1);
            if (!visited[b]) {
                queue.push(b);
                visited[b] = true;
            }
        });
    }
    
    const max = Math.max(...level);
    return level.filter((vLevel) => vLevel === max).length;
}