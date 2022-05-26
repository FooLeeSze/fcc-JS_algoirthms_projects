function rot13(str) {
    // Define and initialize variables
    const space = 13;
    const alpRegex = /[A-Z]/;
    const letterA = 'A'
    const codeA = letterA.charCodeAt(0);
    const midPoint = codeA + 13;
    var decoded = "";
    var currentCode = 0;
  
    // Iterate through each character of the string
    for (let i = 0; i < str.length; i++) {
  
      // If the character is an uppercase letter then decode,
      // else, copy the character
      if (alpRegex.test(str.charAt(i))) {
        currentCode = str.charCodeAt(i);
  
        // If char code is less than midPoint then subtract 13 from char code
        // else, add 13 to char code 
        if (currentCode >= midPoint) {
          decoded = decoded.concat(String.fromCharCode(currentCode - space));
        } else {
          decoded = decoded.concat(String.fromCharCode(currentCode + space));
        }
  
      } else {
        decoded = decoded.concat(str.charAt(i))
      }
    }
  
    return decoded;
  }
  
  rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.");