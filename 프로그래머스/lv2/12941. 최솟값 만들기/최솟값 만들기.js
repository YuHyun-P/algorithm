function solution(A,B){
    const ascending = A.sort((a, b) => a - b);
    const descending = B.sort((a, b) => b - a);
    
    return ascending.reduce((acc, cur, index) => acc + cur * descending[index], 0);
}