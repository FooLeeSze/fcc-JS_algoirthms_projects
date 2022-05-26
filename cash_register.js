function checkCashRegister(price, cash, cid) {

    // Calculate change needed
    var changeNeeded = cash - price;
  
    // Intitalize object to return
    var updateReg = {
      status: "",
      change: []
    }
  
    // Check if enough cash in the register
    let sumInReg = cid.reduce((sum, val) => (sum + val[1]), 0); // Sum of amount in register
  
    // Update register status
    // Return if insufficent funds or if cash in reg = change needed
    if (sumInReg < changeNeeded) {
      updateReg.status = "INSUFFICIENT_FUNDS";
      return updateReg;
    } else if (sumInReg == changeNeeded) {
      updateReg.status = "CLOSED";
      updateReg.change = [...cid];
      return updateReg;
    } else {
      updateReg.status = "OPEN";
    }
  
    /***************************************
     * Calculate change if status = "OPEN" *
     ***************************************/
    // Define currency unit base values
    const unitVal = {
      "PENNY": 0.01,
      "NICKEL": 0.05,
      "DIME": 0.1,
      "QUARTER": 0.25,
      "ONE": 1,
      "FIVE": 5,
      "TEN": 10,
      "TWENTY": 20,
      "ONE HUNDRED": 100
    }
    
    // Initialize variables
    var valAvailable = 0;
    var valIndNote = 0;
    var quantityAvai = 0;
    var unit = cid.length - 1;
    var quantityUsed = 0;
    var quantityNeeded = 0;
    
    // Continue counting while there is still change needed
    // Start with largest currency unit
    while (changeNeeded > 0 && unit >= 0) {
      valAvailable = cid[unit][1];    // Amount available in a currency unit
      valIndNote = unitVal[cid[unit][0]];   // Base amount of the unit
      quantityAvai = valAvailable / valIndNote;    // Quantity of unit available
      quantityNeeded = Math.floor(changeNeeded/valIndNote); // Quantity of unit needed
  
      // Calculate quantity paid and update cash in register
      if (quantityNeeded > 0 && quantityAvai > 0 && updateReg.status == "OPEN") {
        quantityUsed = Math.min(quantityNeeded, quantityAvai);
        updateReg.change.push([cid[unit][0], quantityUsed * valIndNote]);
        changeNeeded -= valIndNote * quantityUsed;
        changeNeeded = Number(changeNeeded).toFixed(2);   // Precision to 2 
      }
  
      // Continue counting for next largest currency unit
      unit--;
    }
  
    // If cash in the register can't be broken down into equivalent of change needed
    // then insufficient funds
    if (changeNeeded > 0) {
      updateReg.status = "INSUFFICIENT_FUNDS";
      updateReg.change = [];
    }
    
    return updateReg;
  }
  
  
  checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])