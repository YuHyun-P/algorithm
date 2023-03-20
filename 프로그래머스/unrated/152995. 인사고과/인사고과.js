function solution(scores) {
    const TARGET = 0;
    
    let rank = 1;
    let prevPerformance = 0;
    let maxPeer = 0;
    const totalTarget = scores[TARGET][0] + scores[TARGET][1];
    
    const sorted = scores
        .map((score, index) => [...score, index])
        .sort((a, b) => a[0] - b[0] || b[1] - a[1]);
    
    while (sorted.length) {
        const [performance, peer, index] = sorted.pop();
        const total = performance + peer;
        
        if (prevPerformance > performance && maxPeer > peer) {
            if (index === TARGET) {
                rank = -1;
                break;
            }
        } else {
            prevPerformance = performance;
            maxPeer = Math.max(maxPeer, peer);
            
            if (total > totalTarget) rank += 1;
        }
    }
    
    return rank;
}