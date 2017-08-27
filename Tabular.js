//function makeMergedCells(range) {
//  var numColumns = range.getNumColumns();
//  var numRows = range.getNumRows();
//  var output = [];
//  var cellContent = range.getDisplayValue();
//  
//  var multicolumnText = '';
//  var multirowText = '';
//  
//  if (numColumns > 1) {
//    multicolumnText = '\\multicolumn{'+ numColumns + '}{' + 'c' + '}{'; 
//  };
//  if (numRows > 1) {
//    multirowText = '\\multirow{' + numRows + '}{*}{';
//  };
//  
//  for (var i = 0; i < numRows; i++) {
//    if (i == 0 && numColumns == 1 && numRows > 1) {
//      output.push(multirowText + cellContent + '}');
//    } else if (i == 0 && numColumns > 1 && numRows > 1) {
//      output.push(multicolumnText + multirowText + cellContent + '}}' );
//    } else if (i == 0) {
//      output.push(multicolumnText + cellContent + '}');
//    } else output.push(multicolumnText + '}');
//  }
//  return output;
//}
//
//function makeTabularCells(range) {
//  var numRows = range.getNumRows();
//  var lastLine = numRows - 1;
//  var numCols = range.getNumColumns();  
//  var values = range.getDisplayValues();
//  
//  var skipMatrix = createSkipMatrix(range.getNumRows(),range.getNumColumns());
//  fixMergedRanges(range,values,skipMatrix);//  Change merged ranges cells in 'values' accordingly and apply changes to skipMatrix
//  
//  var colAligns = '';
//  for(var k = 0; k < numCols; k++){  
//   colAligns +='c';
//  }
//  return {'values':values, 'colAligns':colAligns,'skipMatrix':skipMatrix};
//}
//
//function makeTabular(range,hline){
//  var tabularCells = makeTabularCells(range);
//  return mkTabularStr(tabularCells['values'],tabularCells['colAligns'],tabularCells['skipMatrix'],hline);
//}
//
//function createSkipMatrix(numRows, numColumns){
//    var matrix = [];
//  
//  deepenArray(matrix,numRows);
//  
////  Fill matrix with zeros
//  for(var i=0;i<numRows;i++){
//    for(var j=0;j<numColumns;j++){
//      matrix[i][j]=0;
//    }
//  }
//  return matrix;
//}
//
//function fixMergedRanges(range,values,skipMatrix) 
//{
////  Fill non-zero matrix's entries
//  var mergedRanges = range.getMergedRanges();
//  for(var k=0;k<mergedRanges.length;k++)
//  {
//    var skipNumColumns = mergedRanges[k].getNumColumns() - 1;
//    if(skipNumColumns > 0)
//    {
//      var mergedCells = makeMergedCells(mergedRanges[k]);
//      var matrixColumn = mergedRanges[k].getColumn() - range.getColumn();
//      var matrixRow = mergedRanges[k].getRow() - range.getRow();
//      var numRows = mergedRanges[k].getNumRows();
//      
//      for(var l=0;l<numRows;l++)
//      {
//        skipMatrix[matrixRow + l][matrixColumn] = skipNumColumns; // Number of cells to skip
//        values[matrixRow + l][matrixColumn] = mergedCells[l];
//      }
//    }
//  }
//}