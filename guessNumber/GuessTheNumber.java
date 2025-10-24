import java.util.Scanner;
import java.util.Random;

public class GuessTheNumber{
static Random random = new Random();
    
    private static int getRandom(){
        return random.nextInt(100);
    }

    public static void main(String[] args){
        System.out.println("Kan du gætte hvilket tal jeg tænker på?");
        
        Scanner scanner = new Scanner(System.in);

        int number = getRandom();
        int guess;
        do {
             guess = scanner.nextInt();
            if(guess>number){
                System.out.println("Det var for højt");
            }
            if(guess<number){
                System.out.println("Det var for lavt");
            }
        }while (guess != number);
        System.out.println("Du gættede korrekt");
    }
}