function solution(s) {
    const ascending = s.split(' ').map(Number).sort((a, b) => a - b);
    return `${ascending[0]} ${ascending.at(-1)}`;
}