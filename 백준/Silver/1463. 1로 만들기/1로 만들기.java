import java.io.*;
import java.util.*;

public class Main {

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		int x = Integer.parseInt(br.readLine());
		PriorityQueue<Integer> pq = new PriorityQueue<>();
		cal(pq, x, 0);
		bw.write(String.valueOf(pq.peek()));
		bw.flush();
		bw.close();
		br.close();
	}
	
	public static void cal(PriorityQueue<Integer> pq, int x, int count) {
		if (x==1) {
			pq.add(count);
			return;
		} else if (!pq.isEmpty() && pq.peek() <= count)
			return;
		count++;
		if (x%3 == 0)
			cal(pq, x/3, count);
		if (x%2 == 0)
			cal(pq, x/2, count);
		cal(pq, x-1, count);
	}
}
