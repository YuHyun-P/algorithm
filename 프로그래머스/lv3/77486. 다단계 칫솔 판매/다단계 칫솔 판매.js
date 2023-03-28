function solution(enroll, referral, seller, amount) {
    const MINHO = 1;
    const NO_REFERRAL = '-';
    const PRICE = 100;
    const N = enroll.length;
    const profitList = Array(N + MINHO).fill(0);
    const enrollWithMinho = [...enroll, NO_REFERRAL];
    const nameMap = new Map(enrollWithMinho.map((name, i) => [name, i]));
    
    const parent = Array(N + MINHO).fill(null);
    referral.forEach((name, i) => parent[i] = nameMap.get(name));
    
    const share = (name, profit) => {
        let cur = nameMap.get(name);
        let curProfit = profit;
        while (parent[cur] !== null) {
            const rest = Math.floor(curProfit * 0.1);
            const self = curProfit - rest;
            
            profitList[cur] += self;
            curProfit = rest;
            cur = parent[cur];
        }
    };
    
    seller.forEach((name, i) => share(name, amount[i] * PRICE));
    return profitList.slice(0, N);
}