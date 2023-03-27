function solution(picks, minerals) {
    const [DIA, IRON, STONE] = [0, 1, 2];
    const BATCH_SIZE = 5;
    const TASK = Math.ceil(minerals.length / BATCH_SIZE);
    const nPicks = picks.reduce((acc, cur) => acc + cur, 0);
    const cost = {
        "diamond": [1, 5, 25],
        "iron": [1, 1, 5],
        "stone": [1, 1, 1],
    };
    
    const batchMinerals = Array.from(Array(TASK), () => Array(picks.length).fill(0));
    for (let i = 0; i < minerals.length; i++) {
        const mineral = minerals[i];
        const j = Math.floor(i / BATCH_SIZE);
        for (let pick = 0; pick < picks.length; pick++) {
            batchMinerals[j][pick] += cost[mineral][pick];
        }
    }
    
    const bfs = () => {
        let head = 0;
        const queue = [[[...picks], 0, 0]];
        const minCost = Array(TASK).fill(Infinity);
        
        while (queue.length - head) {
            const [curPicks, curCost, curTask] = queue[head++];
            if (curTask >= TASK) continue;
            
            for (let pick = 0; pick < picks.length; pick++) {
                if (curPicks[pick] === 0) continue;
                
                const nextCost = curCost + batchMinerals[curTask][pick];
                curPicks[pick] -= 1;
                minCost[curTask] = Math.min(minCost[curTask], nextCost);
                queue.push([[...curPicks], nextCost, curTask + 1]);
                curPicks[pick] += 1;
            }
        }
        
        return minCost;
    };
    
    const minCost = bfs();
    return minCost[Math.min(nPicks, TASK) - 1];
}