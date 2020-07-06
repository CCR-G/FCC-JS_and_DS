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

    // Checking if the input is invalid
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

//We want to go from unit to thousands
//and render the right figure using the right portion of the romanTable
function convertToRoman(arabicNumeral) {
  const arabicFigures = arabicNumeral.split("").reverse();
  let romanNumeral = ""; //Variable which will be rendered

  arabicFigures.forEach(function (arabicFigure, i) {
    let romanTableExtract = romanTable.slice(i * 2, i * 2 + 3); //3 elements of the roman table
    let romanFigure;

    if (arabicFigure >= 0 && arabicFigure <= 3) {
      romanFigure = romanTableExtract[0].repeat(arabicFigure);
    } else if (arabicFigure == 4) {
      romanFigure = romanTableExtract[0] + romanTableExtract[1];
    } else if (arabicFigure >= 5 && arabicFigure <= 8) {
      romanFigure =
        romanTableExtract[1] + romanTableExtract[0].repeat(arabicFigure - 5); //Moins lisible
    } else {
      romanFigure = romanTableExtract[0] + romanTableExtract[2]; //9
    }

    romanNumeral = romanFigure + romanNumeral;
  });

  return romanNumeral;
}
