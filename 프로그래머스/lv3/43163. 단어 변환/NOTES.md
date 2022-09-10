# 풀이

1. `begin`과 `words`의 요소들이 정점이고, 정점 간 한 개의 알파벳만 다른 경우 두 정점이 연결되어 있는 무방향 그래프를 만든다.
2. `begin` 정점을 시작점으로 BFS 순회를 하며, 각 정점들에 도달할 수 있는 경로의 길이(`level`)를 기록한다.
3. `target` 정점의 `level`을 반환한다.

<br />

# 예시
**입력값**
|`begin`|`target`|`words`|
|-|-|-|
|"hit"|"cog"|["hot", "dot", "dog", "lot", "log", "cog"]|

**그래프와 `level`**

<img src="https://user-images.githubusercontent.com/96400112/189495845-f793a770-28e7-41c8-8cc9-0c3de6d8a43b.jpeg" width="20%" />
