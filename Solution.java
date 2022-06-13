import java.util.Arrays;

public class Solution {

  public String smallestSubsequence(String s, int k, char letter, int repetition) {

    // How much 'letters' we have in String 's'?
    int letterCount = 0;
    for (int i = 0; i < s.length(); i++) {
      if (s.charAt(i) == letter) {
        letterCount++;
      }
    }

    // 'chars' will be the monotonic stack
    final var chars = new char[s.length()];
    var length = 0; // the current stack size

    // We'll try to place each char of String 's' one by one from first to last
    for (int i = 0; i < s.length(); i++) {
      // the current char
      final var c = s.charAt(i);

      // First we'll check if worth replace the top of the
      // stack with the current char and if we can do it
      while (
        // we need the stack to be not empty
          length > 0
              // and the current char must worth it:
              // must be "lexicographically smaller" than the stack top
              && c < chars[length - 1]
              // Can we do it? Either stack top must not be a letter or,
              // if it actually is, we need to still have letters to replace it
              && (chars[length - 1] != letter || letterCount > repetition)
              // and we also need to have enough remaining chars to have k chars in the subsequence
              && length + s.length() - i > k) {
        // Worth it and we can do it! Remove the current stack top char
        length--;
        // If we are removing a letter then subtract from the letter count
        if (chars[length] == letter) {
          letterCount--;
        }
      }
      // place the current char on the stack top
      chars[length++] = c;
    }

    // First 'k' chars of the stack
    final var kchars = Arrays.copyOf(chars, k);

    // How much 'letters' we have in kchars?
    letterCount = 0;
    for (char c : kchars) {
      if (c == letter) {
        letterCount++;
      }
    }

    // If we have less than the desired number than replace non-letters with 'letter' from ending to
    // beginning of kchars until we have desired quantity of 'letters'
    if (letterCount < repetition) {
      var lettersToPut = repetition - letterCount;
      var index = kchars.length - 1;
      for (int i = 0; i < lettersToPut; i++) {
        while (kchars[index] == letter) {
          index--;
        }
        kchars[index] = letter;
        index--;
      }
    }

    // Return as String
    return String.valueOf(kchars);
  }
}