function solution(tickets) {
    const TOTAL_TICKET = tickets.length;
    const sortedTickets = tickets.sort();
    const used = Array(TOTAL_TICKET).fill(false);
    
    let answer;
    const dfs = (cur, path = []) => {
        path.push(cur);
        
        if (path.length === TOTAL_TICKET + 1) {
            answer = [...path];
            return;
        }
        
        sortedTickets.forEach(([departure, arrival], index) => {
            const canUse = departure === cur && !used[index] && !answer;
            if (!canUse) return;
            
            used[index] = true;
            dfs(arrival, path);
            
            used[index] = false;
            path.pop();
        })
        
    };
    dfs("ICN");
    
    return answer;
}