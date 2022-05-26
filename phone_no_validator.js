function telephoneCheck(str) {
  // Define phone number format regex
  const numRegex = /[^\(]*\d{3}-\d{3}-\d{4}|\(\d{3}\)\d{3}-\d{4}|\(\d{3}\) \d{3}-\d{4}|\d{3} \d{3} \d{4}|\d{10}/
  
  // Define filtering regex
  const filterRegex = /\d{10}\d+|^-|[^|\d-\(\) ]|\)$/;
  const closeBrac = /\)/;
  const openBrac = /\(/;

  // Quick filter of cases with negative country code, too many digits, characters other than the permitted, or contains hanging brackets
  if (filterRegex.test(str)) {
    return false;
  } else if (openBrac.test(str) && !closeBrac.test(str)) {
    return false;
  }

  // Split number into constituent parts
  var strClean = str.replace(/\(|\)|-/g, ' ').replace(/\s+/g, ' ');
  var strSplit = strClean.trim().split(' ');

  // Identify country code (if any)
  if (strSplit.length > 3) {
    var countryCode = strSplit[0];
    // Return false if country code is not 1
    if (countryCode != 1) {
      return false;
    }
  }

  // Check phone number format
  return numRegex.test(str);
}

// console.log(telephoneCheck("(5555555555"));