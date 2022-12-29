import java.util.*;
import java.io.*;
public class Main {

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		int n = Integer.parseInt(br.readLine());
		int[] stairScore = new int[n];
		int[][] dp = new int[n][4];
		for (int i = 0; i<n; i++)
			 stairScore[i] = Integer.parseInt(br.readLine());
		
		dp[0][1] = stairScore[0];
		for (int i=1; i<n; i++) {
			dp[i][0] = Math.max(dp[i-1][1], dp[i-1][2]);
			dp[i][1] = Math.max(dp[i-1][0], dp[i-1][3]) + stairScore[i];
			dp[i][2] = dp[i-1][1] + stairScore[i];
			dp[i][3] = dp[i-1][2];
		}

		int max = Math.max(dp[n-1][1], dp[n-1][2]);
		bw.write(String.valueOf(max));
		bw.flush();
		bw.close();
		br.close();
	}

}
