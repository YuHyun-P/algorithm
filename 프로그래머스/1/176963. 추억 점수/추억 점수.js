function solution(name, yearning, photo) {
    const yearningMap = new Map();
    name.forEach((key, index) => yearningMap.set(key, yearning[index]));
    return photo.map((names) => names.map((key) => yearningMap.get(key) ?? 0).reduce((acc, cur) => acc + cur, 0));
}