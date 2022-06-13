function initCanvas(): void {
  const context = document.querySelector("canvas").getContext("2d");
  context.canvas.height = 400;
  context.canvas.width = 1220;
}

function smallestSubsequence(s: string, k: number, letter: string, repetition: number): string {

  // How much 'letters' we have in String 's'?
  let letterCount = 0;
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) == letter) {
      console.log("Has letter at index " + i);
      letterCount++;
    }
  }
  console.log("letterCount = " + letterCount);

  // 'chars' will be the monotonic stack
  const chars = [];
  let length = 0; // the current stack size

  console.log(chars);

  // We'll try to place each char of String 's' one by one from first to last
  for (let i = 0; i < s.length; i++) {
    // the current char
    const c = s.charAt(i);

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
    && length + s.length - i > k) {
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
  const kchars = chars.slice(0, k);

  // How much 'letters' we have in kchars?
  letterCount = 0;
  for (const c of kchars) {
    if (c == letter) {
      letterCount++;
    }
  }

  // If we have less than the desired number than replace non-letters with 'letter' from ending to
  // beginning of kchars until we have desired quantity of 'letters'
  if (letterCount < repetition) {
    const lettersToPut = repetition - letterCount;
    let index = kchars.length - 1;
    for (let i = 0; i < lettersToPut; i++) {
      while (kchars[index] == letter) {
        index--;
      }
      kchars[index] = letter;
      index--;
    }
  }

  // Return as String
  return kchars.reduce((p, c) => p + c);
}

// Clears the canvas
function cls(context: CanvasRenderingContext2D) {
  context.fillStyle = "#201A23";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

function vai(s: string, k: number, letter: string, repetition: number): void {
  const context = document.querySelector("canvas").getContext("2d");

  cls(context);

  console.log(s, k, letter, repetition);
  console.log(smallestSubsequence(s, k, letter, repetition));

}
