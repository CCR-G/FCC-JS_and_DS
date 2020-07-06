/*
--Roman and Arabic numeral converter--
Convert the given number into either a roman or arabic numeral.
*/

const arabicTable = [1, 5, 10, 50, 100, 500, 1000];
const romanTable = ["I", "V", "X", "L", "C", "D", "M"];
const romanLettersRegex = new RegExp("[^" + romanTable.join("") + "]"); //Regex: /[^IVXLCDM]/
const invalidInput = "not a valid input…";

// Manages form and displays result
var displayResult = document.getElementById("resultContainer");
document.querySelector("form").addEventListener("submit", function (e) {
  const userInput = document.getElementById("userInput").value.toUpperCase();
  
  //We use the right converter function depending on the input
  if (userInput.search(romanLettersRegex) == -1) {
    displayResult.textContent = convertToArabic(userInput);
  } else if (
    userInput.search(/[^\d]/) == -1 &&
    userInput > 0 &&
    userInput < 4000
  ) {
    displayResult.textContent = convertToRoman(userInput);
  } else {
    displayResult.textContent = invalidInput;
  }

  e.preventDefault();
});


/**
 * Converts an arabic numeral into a roman numeral.
 * Each figure is converted starting from units and using a portion of the romanTable.
 *
 * @function convertToRoman
 * @param {string} arabicNumeral - The arabic numeral to convert 
 * @returns {string} An roman numeral
 */
function convertToRoman(arabicNumeral) {
  const arabicFigures = arabicNumeral.split("").reverse();
  let romanNumeral = ""; //Variable which will be rendered

  arabicFigures.forEach(function (arabicFigure, i) {
    
    // Gets the right figures from romanTable using the current arabic figure's place in the number (unit, tens, hundred, thousand).
    // ex: Units get ["I", "V", "X"], tens get ["X", "L", "C"]...
    let romanTableExtract = romanTable.slice(i * 2, i * 2 + 3);
    
    let romanFigure;
    if (arabicFigure >= 0 && arabicFigure <= 3) {
      romanFigure = romanTableExtract[0].repeat(arabicFigure);
    } else if (arabicFigure == 4) {
      romanFigure = romanTableExtract[0] + romanTableExtract[1];
    } else if (arabicFigure >= 5 && arabicFigure <= 8) {
      romanFigure =
        romanTableExtract[1] + romanTableExtract[0].repeat(arabicFigure - 5); // ex: V + II
    } else {
      romanFigure = romanTableExtract[0] + romanTableExtract[2]; //9
    }

    romanNumeral = romanFigure + romanNumeral;
  });

  return romanNumeral;
}


/**
 * Convert a roman numeral into an arabic numeral by analysing each figure,
 * and adding (ex: "XV" = 10 + 5) or substracting (ex: "IV" = 5 - 1) accordingly to the returned arabic numeral.
 * Additionnaly, check if the roman numeral is invalid and return the invalid message in that case.
 *
 * @constructor
 * @param {string} The roman numeral to convert
 * @returns {number | string} An arabic numeral or the invalidInput string.
 */
// We want to go from unit to thousands
// We check all conditions
// We add or substract the currentFigure to the total arabicNumeral
function convertToArabic(romanNumeral) {
  const romanFigures = romanNumeral.split("").reverse();
  let arabicNumeral = 0; //Variable which will be rendered
  let lastFigure = 0;
  let beforeLastFigure = 0;
  let counterEqual = 0; //Used to count identical successive figures

  let i = 0;
  while (i < romanFigures.length && arabicNumeral != invalidInput) {
    let tableIndex = romanTable.indexOf(romanFigures[i]);
    let currentFigure = arabicTable[tableIndex];

    // Checking if the romanNumeral input is invalid
    if (
      (currentFigure == lastFigure &&
        Number.isInteger(tableIndex / 2) == false) ||
      (currentFigure == lastFigure && counterEqual >= 2) ||
      (currentFigure == lastFigure && currentFigure < beforeLastFigure) ||
      (currentFigure < lastFigure && currentFigure <= beforeLastFigure) ||
      (currentFigure < lastFigure &&
        currentFigure * 5 != lastFigure &&
        currentFigure * 10 != lastFigure)      
    ) {
      return invalidInput;
    }

    //When the input is valid
    else {
      if (currentFigure > lastFigure) {
        counterEqual = 0;
        arabicNumeral += currentFigure;
      } else if (currentFigure == lastFigure) {
        counterEqual++;
        arabicNumeral += currentFigure;
      } else {
        arabicNumeral -= currentFigure;
      }

      beforeLastFigure = lastFigure;
      lastFigure = currentFigure;
      i++;
    }
    
    if (arabicNumeral > 3999) {
      return invalidInput;
    }
  }
  return arabicNumeral;
}
