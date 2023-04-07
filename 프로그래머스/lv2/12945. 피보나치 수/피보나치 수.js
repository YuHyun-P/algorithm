function solution(n) {
    const fibonachi = Array(n + 1).fill(0);
    fibonachi[1] = 1;
    fibonachi[2] = 1;
    
    for (let i = 3; i < n + 1; i++) {
        fibonachi[i] = (fibonachi[i - 1] + fibonachi[i - 2]) % 1234567;
    }
    
    return fibonachi[n];
}