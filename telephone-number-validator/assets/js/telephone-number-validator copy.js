/*
--JavaScript Algorithms and Data Structures Projects: Telephone Number Validator--
Returns true if the passed string looks like a valid US phone number.
*/

// Manages form and displays result
var displayResult = document.getElementById("rot13CipherResult");
document.querySelector("form").addEventListener("submit", function (e) {
  const userInput = document.getElementById("userInput").value;
  displayResult.textContent = telephoneCheck(userInput);
  e.preventDefault(); // We don't send the input anywhere
});

function telephoneCheck(str) {
  const userInput = str.toString();

  if (userInput.match(/[^\d-\s\(\)]/g) !== null) return false;
  //1- False si des caractères autre que des chiffres, parenthèse, espaces et - sont trouvé (!== null)

  if (
    userInput.match(/[\d]/g).length < 10 ||
    userInput.match(/[\d]/g).length > 11
  )
    return false;
  //2- False si le nombre de chiffre est soit inf. à 10 ou supp. à 11

  if (userInput.match(/[\d]/g).length == 11 && userInput.match(/^1/) == null)
    return false;
  //3- False s'il y a 11 chiffres et que le premier est différent de 1

  //Si 0 OK
  //Si 1 de chaque OK si
  //--index diff 4
  if (
    (userInput.match(/\(/g) == null && userInput.match(/\)/g) == null) || //Match 0 "(" ET 0 ")"
    (userInput.match(/\(/g) !== null && //"(" existe
    userInput.match(/\)/g) !== null && //")" existe
    userInput.match(/\(/g).length == 1 && //Match 1 "("
    userInput.match(/\)/g).length == 1 && //Match 1 ")"
      userInput.match(/\)/).index - userInput.match(/\(/).index == 4) //")" est 4 caractères plus loin du "("
  )
    return true;
  else return false;
}

console.log(telephoneCheck("1 (555) 555 5555"));

/* running tests
telephoneCheck("1 555)555-5555") should return false.
telephoneCheck("123**&!!asdf#") should return false.
telephoneCheck("(6054756961)") should return false
telephoneCheck("555)-555-5555") should return false.
telephoneCheck("(555-555-5555") should return false.
telephoneCheck("(555)5(55?)-5555") should return false.
// tests completed
*/

// expected output: Array ["T", "I"]

// if only numbers -, ( and ) -OK
// if digits = 10 or 11 -OK ->Yellow
// if digits = 11 et que chiffre 1er char = 1 -OK ->Green
// if ( or ) then ) or ( - OK ->Blue
// if only one ( and ) - OK ->Grey
// if first char = ( then 5th char = ) -OK ->Purple

// delete spaces
