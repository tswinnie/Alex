
import com.sun.speech.freetts.VoiceManager;
import com.sun.speech.freetts.Voice;

/**
 *
 * @author mudafiq
 */
public class TextToSpeechAlan {

    public static void main(String[] args) {
        VoiceManager vm = VoiceManager.getInstance();

        Voice v = vm.getVoice("alan");
        String text = "09:20";
        String kata[] = text.split(" ");
        v.allocate();
        for (int i = 0; i < kata.length; i++) {
            v.speak(kata[i]);

        }
        v.deallocate();
    }
}
