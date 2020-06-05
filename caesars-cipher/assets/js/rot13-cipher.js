/*
--JavaScript Algorithms and Data Structures Projects: Caesars Cipher--
Takes a ROT13 encoded string as input and returns a decoded string.
*/

// Manages form and displays result
var displayResult = document.getElementById("rot13CipherResult");
document.querySelector("form").addEventListener("submit", function (e) {
  const userInput = document.getElementById("userInput").value;
  displayResult.textContent = rot13(userInput);
  e.preventDefault(); // We don't send the input anywhere
});

function rot13(userInput) {
  let charArray = userInput.toUpperCase().split("");
  let decryptedInput = "";

  charArray.forEach(function (inputChar) {
    //For each character of the input,
    //we check wether it is a letter or not,
    //and add it to the decrypted input.
    if (inputChar.search(/[^A-Z]/g) == -1) {
      let inputCharCode = inputChar.charCodeAt();
      let decryptedChar;

      if (inputCharCode <= 77) {
        //From A to M (77) included, we add 13 to the character's ASCII code
        decryptedChar = inputCharCode + 13;
      } else {
        //After Z (90) comes A (65)
        decryptedChar = 77 - (90 - inputCharCode);
      }

      decryptedInput += String.fromCharCode(decryptedChar);
    } else {
      decryptedInput += inputChar;
    }
  });

  return decryptedInput;
}
