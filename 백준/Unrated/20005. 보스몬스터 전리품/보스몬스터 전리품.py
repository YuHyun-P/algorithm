import sys
from collections import deque

input = sys.stdin.readline


def solution(M, N, P, board, idDps, HP):
    EMPTY, BLOCK, BOSS = ".", "X", "B"
    ID, DPS, INIT_POSITION = 0, 1, 2
    INDEX, DISTANCE = 0, 1
    direction = [[0, 1], [1, 0], [0, -1], [-1, 0]]

    def outOfBound(r, c):
        return r < 0 or c < 0 or M <= r or N <= c

    def bfs(startR, startC):
        head = 0
        queue = deque([[startR, startC]])
        bossR, bossC = boss
        distance = [[-1] * N for _ in range(M)]
        distance[startR][startC] = 0

        while queue:
            r, c = queue.popleft()

            for dr, dc in direction:
                nr, nc = r + dr, c + dc
                if outOfBound(nr, nc):
                    continue
                if board[r][c] == BLOCK:
                    continue
                if distance[nr][nc] != -1:
                    continue

                distance[nr][nc] = distance[r][c] + 1

                if nr == bossR and nc == bossC:
                    return distance[nr][nc]
                queue.append([nr, nc])

        return -1

    boss = None
    player = []
    playerMap = {}

    distanceToBoss = []
    for i in range(len(idDps)):
        id, dps = idDps[i].split()
        player.append([id, int(dps), None])
        playerMap[id] = i

    for r in range(M):
        for c in range(N):
            if board[r][c] == BOSS:
                boss = [r, c]
            elif board[r][c] not in (EMPTY, BLOCK):
                index = playerMap[board[r][c]]
                player[index][INIT_POSITION] = [r, c]

    for index, info in enumerate(player):
        r, c = info[INIT_POSITION]
        distance = bfs(r, c)
        if distance == -1:
            continue
        distanceToBoss.append([index, distance])

    t = 0
    curDps = 0
    distanceToBoss.sort(key=lambda x: x[DISTANCE], reverse=True)

    while HP > 0 and distanceToBoss:
        index, distance = distanceToBoss.pop()
        dps = player[index][DPS]
        if t < distance:
            dt = distance - t
            HP -= curDps * dt
            t = distance

            if HP < 0:
                distanceToBoss.append([index, distance])
                break
        curDps += dps

    return P - len(distanceToBoss)


M, N, P = map(int, input().split())
board = [list(input().rstrip()) for _ in range(M)]
idDps = [input().rstrip() for _ in range(P)]
HP = int(input().rstrip())

print(solution(M, N, P, board, idDps, HP))
