function solution(n, computers) {
    const visited = Array(n).fill(false);
    let networkCount = 0;
    
    for (let start=0; start<n; start++) {
        if (visited[start]) continue;
        
        const stack = [start];
        const connectedComponent = [];
        visited[start] = true;
        
        while (stack.length > 0) {
            const vertex = stack.pop();
            connectedComponent.push(vertex);
            
            computers[vertex].forEach((connected, nextVertex) => {
                if (connected === 1 && !visited[nextVertex]) {
                    stack.push(nextVertex);
                    visited[nextVertex] = true;
                }
            })
        }
        
        networkCount += connectedComponent.length > 0 ? 1 : 0;
    }
    
    return networkCount;
}