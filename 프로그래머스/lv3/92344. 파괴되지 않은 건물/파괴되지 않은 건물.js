function solution(board, skill) {
    const N = board.length;
    const M = board[0].length;
    
    const prefixSum = Array.from(Array(N + 1), () => Array(M + 1).fill(0));
    skill.forEach(([type, r1, c1, r2, c2, degree]) => {
        const signDegree = type === 1 ? -degree : degree;
        prefixSum[r1][c1] += signDegree;
        prefixSum[r1][c2 + 1] -= signDegree;
        
        prefixSum[r2 + 1][c1] -= signDegree;
        prefixSum[r2 + 1][c2 + 1] += signDegree;
    });
    
    for (let r = 0; r < N + 1; r++) {
        for (let c = 1; c < M + 1; c++) {
            prefixSum[r][c] += prefixSum[r][c - 1];
        }
    }
    
    for (let r = 1; r < N + 1; r++) {
        for (let c = 0; c < M + 1; c++) {
            prefixSum[r][c] += prefixSum[r - 1][c];
        }
    }
    
    let count = 0;
    board.forEach((row, r) => row.forEach((cell, c) => cell + prefixSum[r][c] > 0 && count++ ))
    
    return count;
}