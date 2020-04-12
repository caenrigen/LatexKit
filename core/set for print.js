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
      var aux=matrix[i][j];
      
      // This block treats row and column spans for elements which have uncertainties
      if(aux.errValue)
      {
        if(aux.rowSpan>1)
        {
          aux.pvalue = '\\multirow{' + aux.rowSpan + '}{*}{ ' + err_printer(aux) + ' }';
          if(aux.colSpan>1)
            aux.pvalue = '\\multicolumn{' + aux.colSpan + '}{c}{' + aux.pvalue + '}';
        }
        
        else if(aux.colSpan>1)
          aux.pvalue = '\\multicolumn{' + aux.colSpan + '}{c}{ ' + err_printer(aux) + ' }';
        
        else
          aux.pvalue = aux.dvalue + ' $\\pm$ ' + aux.errValue;
      }
      
      // This block treats row and column spans for elements which DO NOT have uncertainties
      else
      {
        if(aux.rowSpan>1)
        {
          aux.pvalue = '\\multirow{' + aux.rowSpan + '}{*}{ ' + aux.dvalue + ' }';
          if(aux.colSpan>1)
            aux.pvalue = '\\multicolumn{' + aux.colSpan + '}{c}{ ' + aux.pvalue + ' }';
        }
        
        else if(aux.colSpan>1)
          aux.pvalue = '\\multicolumn{' + aux.colSpan + '}{c}{ ' + aux.dvalue + ' }';
        
        else
          aux.pvalue = aux.dvalue;
      }
      
    }
  return 0;
}

// Default notation for uncertainties
function def_err_printer(aux){
  
 return aux.dvalue + ' $\\pm$ ' + aux.errValue;
}