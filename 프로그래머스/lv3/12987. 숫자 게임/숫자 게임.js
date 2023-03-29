function solution(A, B) {
    const N = A.length;
    
    let nWin = 0;
    let bIndex = 0;
    const descending = (a, b) => b - a;
    
    A.sort(descending);
    B.sort(descending);
    
    for (const a of A) {
        if (a < B[bIndex]) {
            nWin += 1;
            bIndex += 1;
        }
    }
    
    return nWin;
}