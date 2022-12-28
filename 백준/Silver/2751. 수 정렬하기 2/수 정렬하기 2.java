import java.io.*;
import java.util.*;
public class Main {

	public static void main(String[] args) throws IOException {
		// Counting sort
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		StringBuilder sb = new StringBuilder();
		
		boolean[] counting = new boolean[2000001];
		
		int n = Integer.parseInt(br.readLine());
		for (int i=0; i<n; i++)
			counting[Integer.parseInt(br.readLine()) + 1000000] = true;
		
		for (int i=0; i<counting.length; i++)
			if (counting[i])
				sb.append(i-1000000).append("\n");
		
		bw.write(sb.toString());
		bw.flush();
		bw.close();
		br.close();
	}

}
