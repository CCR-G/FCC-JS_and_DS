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

function palindrome(strString) {
  //Turns the given string to lowercase and removes all non-alphanumeric characters from it
  strString = strString.toLowerCase().replace(/[^a-z0-9]/g, "");

  const rtsArray = []; //ARRAY which will receive the BACKWARD spelling of the given string
  const strArray = strString.split(""); //ARRAY containing the FORWARD spelling of the given string
  const strArrayLength = strArray.length; //We declare a constant so that poping letters out of the string will not change the length of the array
  var strArrayLastChar; //Will receive the last character of the ARRAY containing the FORWARD spelling of the given string

  for (let i = 0; i < strArrayLength; i++) {
    //We pop out the last character of the FORWARD ARRAY and put it at the end of the BACKWARD ARRAY
    strArrayLastChar = strArray.pop();
    rtsArray.push(strArrayLastChar);
  }
  // rtsArray = strArray.reverse();
  const rtsString = rtsArray.join(""); //We create a STRING containing the BACKWARD spelling of the string out of the BACKWARD ARRAY

  return {
    isPalindrome: strString === rtsString ? true : false,
    checkedString: strString,
  }; //Ternary condition returning true if the given string equals the BACKWARD STRING
}
