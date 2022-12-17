function solution(want, number, discount) {
    const wantMap = new Map(want.map((item, index) => [item, index]));
    const canBuy = discount.map((_, startDay) => {
        if (discount.length - startDay < 10) {
            return false;
        }
        
        const cart = [...number];
        for (let day = 0; day < 10; day++) {
            const item = discount[startDay + day];
            if (!wantMap.has(item)) {
                return false;
            }
            
            const index = wantMap.get(item);
            if (cart[index] === 0) {
                return false;
            }
            
            cart[index] -= 1;
        }
        
        return true;
    })
    
    return canBuy.filter((answer) => answer).length;
}