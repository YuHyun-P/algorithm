function solution(begin, target, words) {
    const vertices = [begin, ...words];
    const WORD_LENGTH = begin.length;
    
    const graph = new Map(Array.from(
        vertices,
        (word) => [word, { level: Infinity, edges: [] }]
    ));
    
    for (let i = 0; i < vertices.length - 1; i++) {
        for (let j = i + 1; j < vertices.length; j++) {
            const word1 = vertices[i],
                  word2 = vertices[j];
            
            if (word1 === word2) continue;
            
            let diffCount = 0;
            for (let index = 0; index < WORD_LENGTH; index++) {
                if (diffCount > 1) break;
                if (word1[index] === word2[index]) continue;
                
                diffCount++;
            }
            
            if (diffCount > 1) continue;
            
            graph.get(word1).edges.push(word2);
            graph.get(word2).edges.push(word1);
        }
    }
    
    const queue = [begin];
    const visited = new Set();
    graph.set(begin, {...graph.get(begin), level: 0});
    visited.add(begin);
    
    while (queue.length > 0) {
        const vertex = queue.shift();
        
        const { level: curLevel, edges } = graph.get(vertex);
        edges.forEach((nextVertex) => {
            if (visited.has(nextVertex)) return;
            
            queue.push(nextVertex);
            visited.add(nextVertex);
            console.log(nextVertex, curLevel + 1);
            graph.set(nextVertex, {...graph.get(nextVertex), level: curLevel + 1})
        })
    }
    
    if (graph.get(target) === undefined) return 0;
    const answer = graph.get(target).level;
    
    return answer === Infinity ? 0 : answer;
}