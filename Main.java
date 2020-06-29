import java.util.*;

class Main {
    public static void main(String[] args){
            Scanner sc = new Scanner(System.in);
            String str = sc.nextLine();
            String[] strArr = str.split("");
            for (int i = 0; i < strArr.length; i++) {
                String letterToCaps = strArr[i];
                String capsLetter = letterToCaps.toUpperCase();
                StringBuilder sb = new StringBuilder("");

                for (int j = 0; j < strArr.length; j++) {
                    if (j == i) {
                        sb.append(capsLetter);
                    } else {
                        sb.append(strArr[j]);
                    }
                }
                System.out.println(sb.toString());
                    
            }

    }
}
