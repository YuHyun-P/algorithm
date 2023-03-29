function solution(n, money) {
    const COUNT = money.length;
    const dp = Array.from(Array(money.length + 1), () => Array(n + 1).fill(0));
    
    for (let i = 0; i < money.length; i++) {
        dp[i][money[i]] = 1;
        dp[COUNT][money[i]] += 1;
        for (let change = money[i] + 1; change < n + 1; change++) {
            dp[i][change] = dp[COUNT][Math.max(0, change - money[i])];
            dp[COUNT][change] += dp[i][change];
        }
    }
    
    return dp[COUNT][n];
}