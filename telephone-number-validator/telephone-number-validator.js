/*
--JavaScript Algorithms and Data Structures Projects: Telephone Number Validator--
Returns true if the passed string looks like a valid US phone number.
*/

// Manages form and displays result
var displayResult = document.getElementById("phoneNbValidatorResult");
var checkedNumber = document.getElementById("checkedNumber");

document.querySelector("form").addEventListener("submit", function (e) {
  const userInput = document.getElementById("userInput").value;
  const phoneNumber = telephoneCheck(userInput);
  checkedNumber.innerHTML = "";

  if (phoneNumber.result === true) {
    displayResult.textContent = "valid!";
    checkedNumber.innerHTML += " " + phoneNumber.cleanNumber;
  } else {
    displayResult.textContent = "not valid…";
  }

  e.preventDefault(); // We don't send the input anywhere
});

function telephoneCheck(userInput) {
  const phoneNumber = userInput.toString(); //Converts input to string so that we can regex it
  const cleanNumber = phoneNumber.replace(/[^\d\(\)]/g, ""); //Removes any character that is neither a digit, nor a "(", nor a ")"

  if (phoneNumber.charAt(0).match(/\d|\(/) == null) return false; //Returns false if first character of input is neither a digit nor a "("

  if (
    cleanNumber.match(
      /^1\d{10}$|^\d{10}$|^\(\d{3}\)\d{7}$|^1\(\d{3}\)\d{7}$/g
    ) == null
    //From the beginning (^) to the end ($) of the string
    //Possibilities : 1xxxxxxxxxx || xxxxxxxxxx || (xxx)xxxxxxx || 1(xxx)xxxxxxx
    //Returns false if none of the possibilities matches
  )
    return false;

  return {
    result: true,
    cleanNumber: cleanNumber,
  };
}
