const DIRECTION = {
  TOP: [-1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1],
  BOTTOM: [1, 0],
};

// nodeType: { inDirection: outDriection, ... }
const OUT_DIRECTION = {
  S: {
    TOP: "BOTTOM",
    LEFT: "RIGHT",
    RIGHT: "LEFT",
    BOTTOM: "TOP",
  },
  L: {
    TOP: "RIGHT",
    LEFT: "TOP",
    RIGHT: "BOTTOM",
    BOTTOM: "LEFT",
  },
  R: {
    TOP: "LEFT",
    LEFT: "BOTTOM",
    RIGHT: "TOP",
    BOTTOM: "RIGHT",
  },
};

const convertDirection = (direction) => {
    switch (direction) {
        case "TOP": return "BOTTOM";
        case "LEFT": return "RIGHT";
        case "RIGHT": return "LEFT";
        case "BOTTOM": return "TOP";
    }
}

function solution(grid) {
    // m * n grid
    const [m, n] = [grid.length, grid[0].length];
    const visited = new Set();
    const answer = [];
    
    const getNext = (i, j, outDirection) => {
        const nextI = (i + DIRECTION[outDirection][0]) % m;
        const nextJ = (j + DIRECTION[outDirection][1]) % n;
        return [nextI < 0 ? m - 1 : nextI, nextJ < 0 ? n - 1 : nextJ];
    };
    
    const dfs = (start, inDirection) => {
        const [i, j] = start;
        const nodeType = grid[i][j];
        const outDirection = OUT_DIRECTION[nodeType][inDirection];
        
        const queue = [[i, j, outDirection]];
        let length = 0;
        
        while (queue.length !== 0) {
            const [i, j, outDirection] = queue.shift();
            const edge = [i, j, outDirection].join("-"); // 0-0-TOP
            if (visited.has(edge)) {
                if (length > 0) {
                    answer.push(length);
                }
                break
            };
            
            visited.add(edge);
            length++;
            
            const [nextI, nextJ] = getNext(i, j, outDirection);
            const nextNodeType =  grid[nextI][nextJ];
            const nextOutDirection = OUT_DIRECTION[nextNodeType][convertDirection(outDirection)];
            queue.push([nextI, nextJ, nextOutDirection]);
        }
    };
    
    
    for (let i=0; i<m; i++) {
        for (let j=0; j<n; j++) {
            Object.keys(DIRECTION).forEach((inDirection) => {
                dfs([i, j], inDirection, visited);
            })
        }
    }
    
    return answer.sort((a, b) => a - b);
}