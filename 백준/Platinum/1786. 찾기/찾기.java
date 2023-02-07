import java.util.*;
import java.io.*;

public class Main {
	static char[] text;
	static char[] pattern;
	static int[] fail;
	static int cnt;
	static ArrayList<Integer> list;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		text = br.readLine().toCharArray();
		pattern = br.readLine().toCharArray();
		fail = failure(pattern);
		list = new ArrayList<>();
		
		KMP();
		bw.write(cnt + "\n");
		for (int i:list) 
			bw.write(i + " ");
		
		bw.flush();
		br.close();
		bw.close();
		
	}

	static void KMP() {
		int p_cur = 0;
		for (int t_cur = 0; t_cur <text.length; t_cur++) {
			while (p_cur > 0 && text[t_cur] != pattern[p_cur])
				p_cur = fail[p_cur-1];
			if (text[t_cur] == pattern[p_cur]) {
				if (p_cur == pattern.length - 1) { // match
					list.add(t_cur - p_cur + 1);
					p_cur = fail[p_cur];
					cnt++;
				}else
					p_cur++;
			}
		}
	}

	static int[] failure(char[] pattern) {
		int[] fail = new int[pattern.length];
		int k = 0;
		for (int j=1; j<pattern.length; j++) {
			while(k > 0 && pattern[j] != pattern[k])
				k = fail[k-1];
			if (pattern[j] == pattern[k])
				fail[j] = ++k; 
		}
		return fail;
	}

}