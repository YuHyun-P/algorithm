function solution(begin, target, words) {
    const visited = Array(words.length).fill(false);
    
    const countDiff = (wordA, wordB) => [...wordA].filter((char, index) => wordB[index] !== char).length;
    const dfs = (cur) => {
        if (cur === target) return 0;
        
        let min = Infinity;
        for (const [index, next] of words.entries()) {
            if (visited[index]) continue;
            if (countDiff(cur, next) !== 1) continue;
            
            visited[index] = true;
            min = Math.min(min, dfs(next) + 1);
            visited[index] = false;
        }
        return min;
    };
    
    const min = dfs(begin);
    return min !== Infinity ? min : 0;
}