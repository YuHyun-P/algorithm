function solution(routes) {
    const [ENTER, EXIT] = [0, 1];
    const END = [Infinity, Infinity];
    
    let count = 0;
    let latestExit = -Infinity;
    
    routes.push(END);
    routes.sort((a, b) => a[EXIT] - b[EXIT] || a[ENTER] - b[ENTER]);
    latestExit = routes[0][EXIT];

    for (const [enter, exit] of routes) {
        if (enter <= latestExit && latestExit <= exit) continue;
        count += 1;
        latestExit = exit;
    }
    
    return count;
}