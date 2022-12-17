function solution(price, money, count) {
    let total = 0;
    for (let cnt = 0; cnt < count; cnt++) {
        total += price * (cnt + 1);
    }
    return total < money ? 0 : total - money;
}