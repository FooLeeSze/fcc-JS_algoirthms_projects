function convertToRoman(num) {

  // Check if number is an integer and is within range of Roman numerals
  if (!Number.isInteger(num)) {
    console.log('Number must be an integer')
    return undefined;
  } else if (num < 1 || num > 3999) {
    console.log('Number should be between 1 and 3999')
    return undefined;
  }

  // Define fundamental Roman numerals
  const romanSym = {
    1: 'I',
    5: 'V',
    9: 'IX',
    10: 'X',
    50: 'L',
    90: 'XC',
    100: 'C',
    500: 'D',
    900: 'CM',
    1000: 'M'
  }

  // Define array of numbers equivalent to fundamental Roman numerals
  const fundamentals = Object.keys(romanSym).map(x => Number(x));

  // Initialize variables
  var romanStr = "";
  var remainder = num;
  var largestMagVal = 0; 
  var fundaInd = 0; 
  var funda = 0; 
  var factor = 0;


  // Continue building Roman numeral string while there is still a remainder
  while(remainder > 0) {
    // Determine the value at the largest order of magntiude of the current remainder 
    largestMagVal = roundToOrderMag(remainder);

    // Find the nearest fundamental (Roman char) that is smaller than largestMagVal
    if (largestMagVal < 1000) {
      fundaInd = fundamentals.findIndex(funda => (Math.floor(largestMagVal / funda) == 0)) - 1;
    } else {
      fundaInd = fundamentals.length - 1;
    }

    funda = fundamentals[fundaInd];
    factor = Math.floor(largestMagVal / funda); // Number of times the Roman char is repeated

    // Build Roman numeral string
    if (factor <= 3) {
      // If Roman char repeated <= 3 times, use addition method
      romanStr = romanStr.concat(romanSym[funda].repeat(factor));
      remainder -= funda*factor;
    } else {
      // If Roman char repeated > 3 times, use subtraction method
      let num2sub = fundamentals[fundaInd + 1];
      let diff = (num2sub - largestMagVal) / funda;
      romanStr = romanStr.concat(romanSym[funda].repeat(diff)).concat(romanSym[num2sub]);
      remainder -= num2sub - funda * diff;
    } 
  }

  // Function that determines the value at the largest order of magnitude
  function roundToOrderMag(num) {
    let orderMag = Math.pow(10, (Math.floor(Math.log(num) / Math.log(10))));
    return orderMag * Math.floor(num / orderMag);
  }
  
 return romanStr;
}

console.log(convertToRoman(3999));