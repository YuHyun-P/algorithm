/*
테스트 1 〉	실패 (런타임 에러)
테스트 2 〉	실패 (런타임 에러)
테스트 3 〉	통과 (0.16ms, 33.5MB)
테스트 4 〉	통과 (0.16ms, 33.5MB)
*/
/*
function solution(tickets) {
  const TICKET_NUM = tickets.length;
  const graph = new Map();
  tickets.forEach(([a, b]) => {
    if (graph.has(a)) {
      graph.get(a).push(b);
    } else {
      graph.set(a, [b]);
    }
  });

  const visited = new Map();
  for (const [key, value] of graph) {
    value.sort();

    visited.set(key, Array(value.length).fill(false));
  }

  const paths = [];

  const dfs = (departure, path = []) => {
    path.push(departure);

    if (path.length === TICKET_NUM + 1) {
      paths.push([...path]);
      return;
    }

    if (paths.length > 0) {
      return;
    }

    graph.get(departure).forEach((arrival, index) => {
      if (visited.get(departure)[index]) return;

      visited.get(departure)[index] = true;
      dfs(arrival, path);

      path.pop();
      visited.get(departure)[index] = false;
    });
  };

  dfs("ICN");
  console.log(paths);

  return paths[0];
}
 */

function solution(tickets) {
  const sortedTickets = [...tickets].sort();

  let answer = null;
  const used = Array(tickets.length).fill(false);

  const dfs = (cur, path = []) => {
    path.push(cur);

    if (path.length === tickets.length + 1) {
      answer = [...path];
      return;
    }

    if (answer) {
      return;
    }

    sortedTickets.forEach(([departure, arrival], index) => {
      const canUseTicket = departure === cur && !used[index];
      if (!canUseTicket) return;

      used[index] = true;
      dfs(arrival, path);

      used[index] = false;
      path.pop();
    });
  };

  dfs("ICN");  

  return answer;
}
