import java.io.*;

public class Main {

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		int n = Integer.parseInt(br.readLine());
		if (n < 3)
			bw.write(String.valueOf(n));
		else {
			long[] fib = new long[n + 2];
			for (int i = 0; i < fib.length; i++) {
				if (i < 2)
					fib[i] = i;
				else
					fib[i] = (fib[i - 1] + fib[i - 2])%10007;
			}
			bw.write(String.valueOf(fib[n + 1]));
		}
		bw.flush();
		bw.close();
		br.close();
	}
}
