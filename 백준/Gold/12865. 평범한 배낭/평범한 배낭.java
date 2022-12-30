import java.io.*;
import java.util.*;
public class Main {

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		int n = Integer.parseInt(st.nextToken());	// # obj
		int k = Integer.parseInt(st.nextToken());	// limit
		int[] w = new int[n];	
		int[] v = new int[n];
		int[] dp = new int[k+1];
		
		for (int i=0; i<n; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			w[i] = Integer.parseInt(st.nextToken());
			v[i] = Integer.parseInt(st.nextToken());
		
		}
		
		for (int i=0; i<n; i++) {
			for (int j=k; j>=0; j--) {
				if (j >= w[i]) {
					dp[j] = Math.max(dp[j], dp[j-w[i]] + v[i]);
				}
			}
		}

		bw.write(String.valueOf(dp[k]));
		bw.flush();
		bw.close();
		br.close();
	}

}
