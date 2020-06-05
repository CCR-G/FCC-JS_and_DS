/*
--JavaScript Algorithms and Data Structures Projects: Roman Numeral Converter--
Convert the given number into a roman numeral.
*/

var displayResult = document.getElementById("romanNumeralResult");

// Manages form and displays result
document.querySelector("form").addEventListener("submit", function (e) {
  const userInput = document.getElementById("userInput").value;

  if (
    userInput.toString().search(/[^\d]/g) == -1 &&
    userInput > 0 &&
    userInput < 4000
  ) {
    displayResult.textContent = convertToRoman(userInput);
  } else {
    displayResult.textContent = "not a valid input…";
  }

  e.preventDefault(); // We don't send the input anywhere
});

function convertToRoman(arabicNumber) {
  const arabicDigits = arabicNumber.toString().split("").reverse(); //Make the input into an array and reverse it
  const romanNumber = [];
  const romanDigits = ["I", "V", "X", "L", "C", "D", "M"];

  //We call switchDigit for unit, tens, hundreds and then thousands.
  //We give the function the current arabicDigit and a portion of the romanDigits array.
  //We add the romanDigit the function returns at the beginning of the romanNumber array.
  for (var i = 0; i < arabicDigits.length; i++) {
    switch (i) {
      case 0:
        romanNumber.unshift(
          switchDigit(arabicDigits[i], romanDigits.slice(0, 3))
        );
        break;
      case 1:
        romanNumber.unshift(
          switchDigit(arabicDigits[i], romanDigits.slice(2, 5))
        );
        break;
      case 2:
        romanNumber.unshift(switchDigit(arabicDigits[i], romanDigits.slice(4)));
        break;
      case 3:
        romanNumber.unshift(switchDigit(arabicDigits[i], romanDigits[6]));
        break;
    }
  }
  return romanNumber.join(""); //Converting the array into a string which we return
}

//Depending on the arabicDigit we give the function,
//we take the corresponding romanDigit from the romanDigits table extract (rDsExtract)
//and return it.
function switchDigit(arabicDigit, rDsExtract) {
  let romanDigit;

  if (arabicDigit >= 0 && arabicDigit <= 3) {
    // 0, 1, 2, 3
    romanDigit = rDsExtract[0].repeat(arabicDigit);
  } else if (arabicDigit == 4) {
    // 4
    romanDigit = rDsExtract[0] + rDsExtract[1];
  } else if (arabicDigit >= 5 && arabicDigit <= 8) {
    // 5, 6, 7, 8
    romanDigit = rDsExtract[1] + rDsExtract[0].repeat(arabicDigit - 5);
  } else {
    // 9
    romanDigit = rDsExtract[0] + rDsExtract[2];
  }
  return romanDigit;
}
