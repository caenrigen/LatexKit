//function mkErrTabularCells(range, isErrCol){
//  var displayValues = range.getDisplayValues();
//  var values = range.getValues();
//  var numRows = range.getNumRows();
//  var numColumns = range.getNumColumns();
//  var numColumns2 = numColumns-1;
//  var outputArray = [];
//  deepenArray(outputArray,numRows);
//  
//  // Used to know how many error columns where found
//  var columnSkips = 0;
//  
//  // Iterate over columns
//  for(var c = 0; c < numColumns; c++)
//  { 
//    // Check if it the current column has error && if it is the last column there can't be erros on next
//    if(isErrCol[c+1]  && c<numColumns2)
//    { 
//      // Iterate over all the values on the column
//      for(var r=0;r<numRows;r++)
//      {
//        outputArray[r][c-columnSkips] = (typeof values[r][c] === "number" || typeof values[r][c+1] === "number")?(numPmUncert(displayValues[r][c],displayValues[r][c+1])):(displayValues[r][c]);
//      }
//      // Skip next column because it is a error column
//      c++;
//      // Count the skips
//      columnSkips++;
//    } 
//    else
//     for(var r=0;r<numRows;r++)
//       outputArray[r][c-columnSkips] = displayValues[r][c];
//     
//  }
//  
//  var colAligns = '';
//  for(var i=0; i<isErrCol.length; i++){
//    if(!isErrCol[i]) colAligns += 'c';
//  }
//  return {'values':outputArray,'colAligns':colAligns};
//}
//
//function makeErrTabular(range,isErrCol,hline){
//  var tabularCells = mkErrTabularCells(range,isErrCol);
//  return mkTabularStr(tabularCells['values'],tabularCells['colAligns'],undefined,hline);
//}
//
//function numPmUncert(numStr, errorStr){
//  return numStr+' $\\pm$ '+errorStr;
//}