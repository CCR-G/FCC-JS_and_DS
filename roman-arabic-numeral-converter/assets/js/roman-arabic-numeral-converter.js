/*
--Roman and Arabic numeral converter--
Convert the given number into either a roman or arabic numeral.
*/

const arabicTable = [1, 5, 10, 50, 100, 500, 1000];
const romanTable = ["I", "V", "X", "L", "C", "D", "M"];
const romanLettersRegex = new RegExp("[^" + romanTable.join("") + "]"); //Regex: /[^IVXLCDM]/
const invalidInput = "not a valid input…";

// Manages form event listener
var displayResult = document.getElementById("resultContainer");
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const userInput = document.getElementById("userInput").value.toUpperCase();

  // Only roman letters -> convertToArabic()
  if (userInput.search(romanLettersRegex) == -1) {
    displayResult.textContent = convertToArabic(userInput);
  }
  // Only figures -> convertToRoman()
  else if (
    userInput.search(/[^\d]/) == -1 &&
    userInput > 0 &&
    userInput < 4000
  ) {
    displayResult.textContent = convertToRoman(userInput);
  } else {
    displayResult.textContent = invalidInput;
  }
});

/**
 * Converts an arabic numeral into a roman numeral.
 * Each figure is converted starting from units and using a portion of the romanTable.
 *
 * @function convertToRoman
 * @param {string} arabicNumeral - The arabic numeral to convert
 * @returns {string} A roman numeral (romanNumeral)
 */
function convertToRoman(arabicNumeral) {
  const arabicFigures = arabicNumeral.split("").reverse();
  let romanNumeral = "";

  arabicFigures.forEach(function (arabicFigure, i) {
    // Gets the right figures from romanTable using the current arabic figure's place in the number (unit, tens, hundred, thousand).
    // eg: Units get ["I", "V", "X"], tens get ["X", "L", "C"]...
    let romanTableExtract = romanTable.slice(i * 2, i * 2 + 3);

    let romanFigure;
    if (arabicFigure >= 0 && arabicFigure <= 3) {
      romanFigure = romanTableExtract[0].repeat(arabicFigure);
    } else if (arabicFigure == 4) {
      romanFigure = romanTableExtract[0] + romanTableExtract[1];
    } else if (arabicFigure >= 5 && arabicFigure <= 8) {
      romanFigure =
        romanTableExtract[1] + romanTableExtract[0].repeat(arabicFigure - 5); // eg: VIII = 5 + (1 *(8 - 5))
    } else {
      romanFigure = romanTableExtract[0] + romanTableExtract[2]; //9
    }

    romanNumeral = romanFigure + romanNumeral;
  });

  return romanNumeral;
}

/**
 * Converts a roman numeral into an arabic numeral.
 * Analyses each roman figure from the right.
 * Adds it (eg: "XV" = 10 + 5) or substracts it (eg: "IV" = 5 - 1) to the arabicNumeral to be returned.
 *
 * @function convertToArabic
 * @param {string} romanNumeral - The roman numeral to convert
 * @returns {number | string} An arabic numeral (arabicNumeral) or the invalid message (invalidInput)
 */
function convertToArabic(romanNumeral) {
  const romanFigures = romanNumeral.split("").reverse();
  let arabicNumeral = 0;

  //Variables to compare
  let currentFigure = 0;
  let lastFigure = 0;
  let beforeLastFigure = 0;
  let counterEqual = 0; //Used to count identical successive figures

  let i = 0;
  while (i < romanFigures.length && arabicNumeral != invalidInput) {
    let tableIndex = romanTable.indexOf(romanFigures[i]);
    currentFigure = arabicTable[tableIndex];

    if (
      isInvalidRomanNumSequence(
        currentFigure,
        lastFigure,
        beforeLastFigure,
        tableIndex,
        counterEqual
      )
    ) {
      return invalidInput;
    } else {
      if (currentFigure > lastFigure) {
        counterEqual = 0;
        arabicNumeral += currentFigure; //eg: XV
      } else if (currentFigure == lastFigure) {
        counterEqual++;
        arabicNumeral += currentFigure; //eg: XX
      } else if (currentFigure < lastFigure) {
        arabicNumeral -= currentFigure; //eg: IX
      }

      if (arabicNumeral > 3999) return invalidInput;

      // Updates variables for next iteration
      beforeLastFigure = lastFigure;
      lastFigure = currentFigure;
      i++;
    }
  }
  return arabicNumeral;
}

/**
 * Returns true if the roman numeral is invalid (ie: The roman figures are not in the right order).
 * Checks all cases by comparing the figures.
 * eg: VV, IIII, IIV, IVI, IVX, IC
 *
 * @function isInvalidRomanNumSequence
 * @param {number} currentFigure - Currently checken arabic figure
 * @param {number} lastFigure - Last checken arabic figure
 * @param {number} beforeLastFigure - Before last checken arabic figure
 * @param {number} tableIndex - The index of the current roman figure in romanTable
 * @param {number} counterEqual - The identical successive figure counter
 * @returns {boolean} True if invalid
 */
function isInvalidRomanNumSequence(
  currentFigure,
  lastFigure,
  beforeLastFigure,
  tableIndex,
  counterEqual
) {
  if (
    (currentFigure == lastFigure && !Number.isInteger(tableIndex / 2)) ||
    (currentFigure == lastFigure && counterEqual >= 2) ||
    (currentFigure == lastFigure && currentFigure < beforeLastFigure) ||
    (currentFigure < lastFigure && currentFigure <= beforeLastFigure) ||
    (currentFigure < lastFigure &&
      currentFigure * 5 != lastFigure &&
      currentFigure * 10 != lastFigure)
  ) {
    return true;
  } else {
    return false;
  }
}
