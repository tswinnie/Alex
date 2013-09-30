
import com.sun.speech.freetts.VoiceManager;
import com.sun.speech.freetts.Voice;

/**
 *
 * @author mudafiq
 */
public class TextToSpeechKevin16 {

    public static void main(String[] args) {
        VoiceManager vm = VoiceManager.getInstance();

        Voice v = vm.getVoice("kevin16");
        String text = "my name is mudafiq riyan pratama";
        String kata[] = text.split(" ");
        v.allocate();
        for (int i = 0; i < kata.length; i++) {
            v.speak(kata[i]);

        }
        v.deallocate();
    }
}
