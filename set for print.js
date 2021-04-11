// This function takes the matrix of values and properties and creates a new property 
// named pvalue (printing value) which has the \multirow and \multicolumn settings and $\pm$ for uncertainties
// Example of actuation on a cell obj
// Cell obj: { value    : 7.5 ,
//             rowSpan  : 2   ,
//             colSpan  : 3   ,
//             errValue : 0.4 }
//
// The above cell obj is transformed into:
// Cell obj: { value    : 7.5 ,
//             rowSpan  : 2   ,
//             colSpan  : 3   ,
//             errValue : 0.4 ,
//             pvalue   : \multicolumn{3}{c}{\multirow{2}{*}{7.5 $\pm$ 0.4}} }


function set_forPrint(spec , err_printer ) { 
  // Get the arguments from object spec
  var matrix = spec.matrix;
  var colFeats = spec.colFeats;
  
  // 
  var i,j;
  for(i=0;i<matrix.length;i++)
    for(j=0;j<matrix[i].length;j++) 
    {
      // auxiliar reference to obj to ease the reading of the code
      var cell=matrix[i][j];
      
      cell.pvalue = cell.errValue ? err_printer(cell) : cell.dvalue;

      if(cell.rowSpan > 1)
        cell.pvalue = '\\multirow{' + cell.rowSpan + '}{*}{ ' + cell.pvalue + ' }';

      if(cell.colSpan > 1)
        cell.pvalue = '\\multicolumn{' + cell.colSpan + '}{c}{' + cell.pvalue + '}';
    }
  return 0;
}

// Default notation for uncertainties
function def_err_printer(aux){
 return aux.dvalue + ' $\\pm$ ' + aux.errValue;
}

