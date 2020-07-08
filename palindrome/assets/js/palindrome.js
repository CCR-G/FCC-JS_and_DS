/*
--JavaScript Algorithms and Data Structures Projects: Palindrome Checker--
Return true if the given string is a palindrome. Otherwise, return false.
*/

var submittedInput = document.getElementById("submittedInput");
var displayResult = document.getElementById("palindromeResult");

// Manages form and displays result
document.querySelector("form").addEventListener("submit", function (e) {
  const userInput = document.getElementById("userInput").value;
  const result = palindrome(userInput);
  submittedInput.innerHTML =
    'Input converted to "<strong>' + result.checkedString + '</strong>".';

  if (result.isPalindrome === true) {
    displayResult.innerHTML = "a palindrome!";
  } else {
    displayResult.innerHTML = "not a palindrome…";
  }

  e.preventDefault(); // We don't send the input anywhere
});

/**
 * Checks if a given string is a palindrome.
 * Deletes non alpha-numerical characters.
 * Reverses the given string to compare it with the original.
 *
 * @function palindrome
 * @param {string} myString - The string to be checken
 * @returns {object} Returns two parameters : boolean isPalindrom and string checkedString
 */
function palindrome(myString) {
  myString = myString.toLowerCase().replace(/[^a-z0-9]/g, "");

  let myStringReversedArray = myString.split("").reverse();
  let myStringReversed = myStringReversedArray.join("");

  return {
    isPalindrome: myString === myStringReversed ? true : false,
    checkedString: myString,
  };
}
