function solution(n, roads, sources, destination) {
    const distance = Array(n + 1).fill(Infinity);
    
    const graph = Array.from(Array(n + 1), () => []);
    roads.forEach(([a, b]) => {
        graph[a].push(b);
        graph[b].push(a);
    });
    
    const bfs = (start) => {
        let head = 0;
        const queue = [start];
        distance[destination] = 0;
        
        while (queue.length - head) {
            const cur = queue[head++];
            
            for (const next of graph[cur]) {
                if (distance[next] !== Infinity) continue;
                
                distance[next] = distance[cur] + 1;
                queue.push(next);
            }
        }
    };
    
    bfs(destination);
    return sources.map((source) => distance[source] === Infinity ? -1 : distance[source]);
}