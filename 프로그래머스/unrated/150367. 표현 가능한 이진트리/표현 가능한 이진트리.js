function solution(numbers) {
    const dfs = (tree) => {
        if (tree.length === 1) return true;
        
        const root = Math.floor(tree.length / 2);
        if (tree[root] === '1') {
            return dfs(tree.substring(0, root)) && dfs(tree.substring(root + 1));
        }
        return [...tree].every((num) => num === '0');
    }
    
    return numbers.map((number) => {
        const binary = number.toString(2);
        const height = Math.ceil(Math.log2(binary.length + 1));
        return dfs(binary.padStart(2 ** height - 1, '0')) ? 1 : 0;
    });
}