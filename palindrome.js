function palindrome(str) {
    // Remove non-alphanumeric characters
    let cleanStr = str.replace(/[^a-z0-9]/gi, '');
  
    // Convert all characters to lowercase
    cleanStr = cleanStr.toLowerCase();
  
    // Find mid point of str
    let midPoint = cleanStr.length / 2;
  
    // Loop through one half and check if similar to other half
    for (let i = 0; i < midPoint; i++) {
      // If not equal, return false
      if (cleanStr.charAt(i) != cleanStr.charAt(cleanStr.length - i - 1)) {
        return false;
      }
    }
    // If all are equal, return true
    return true;
  }
  
  console.log(palindrome("_eye"));