function solution(e, starts) {
    const LIMIT = 5000000;
    const freq = Array(LIMIT + 1).fill(0);
    const answer = Array.from(Array(e + 1), (_, i) => i);

    for (let i = 1; i < LIMIT + 1; i++) {
        for (let j = 1; i * j < LIMIT + 1; j++) {
            freq[i * j] += 1;
        }
    }
    
    for (let i = e - 1; 0 < i; i--) {
        const prevMaxFreq = freq[answer[i + 1]];
        if (freq[i] >= prevMaxFreq) {
            answer[i] = i;
        } else {
            answer[i] = answer[i + 1];
        }
    }
    
    return starts.map((i) => answer[i]);
}