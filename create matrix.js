// This function is called by method string.replace() to correctly escape LaTex characters
function myReplacer(match){
  
  // These chars are escaped prepending a backslash
 if (match=="&" || match=="%" || match=="$" || match=="#" || match=="_" || match =="{" || match =="}")
   return ("\\"+match);
   
  // These chars are escaped by using the following macros
  else if(match=="~")
    return "\\textasciitilde ";
  
  else if(match=="^")
    return "\\textasciicircum ";
  
  else if(match=="\\")
    return "\\textbackslash ";
  
  // If a character doesn't need any special treatment in LaTex
  else
    return match;
}


//Creates and returns a cell object
function cell(spec)
{
  
  var that={dvalue  : spec.dvalue,
            value   : spec.value,
            rowSpan : spec.rowSpan,
            colSpan : spec.colSpan};
  
  return that;
}

//Cria uma matriz das estruturas Cell e guarda lá os valores do range
function create_matrix(spec)
{
  var range=spec.range;
  var settingsArray=spec.settingsArray;
  
  // This block of code prepares a regular expression
  // based on a user defined set of characters
  // for escaping special characters in Latex
  
  // Get all characters user wants to escape
  var escapeChars=getTabSettingsFromArray(settingsArray).getEscapeChars();
  
  // The \ ^ - ] characters are special chars inside square braces
  // so they must be precided with \ to be used inside a character class 
  escapeChars = escapeChars.replace('\\', '\\\\');
  escapeChars = escapeChars.replace('\^', '\\\^');
  escapeChars = escapeChars.replace('\-', '\\\-');
  escapeChars = escapeChars.replace('\]', '\\\]');
  
  // This line of code does the same as the four above but is harder do read :)
  //escapeChars = escapeChars.replace (/[\^\-\]\\]/g, '\\$&');
  
  // Create a regular expression for escaping user defined characters
  var myRe = new RegExp('\['+escapeChars+'\]', 'g');
    
  // matriz a retornar no final da funcao
  var matrix = []; 
  // variavel local para ter os valores que estao no range
  var range_value  = range.getValues();
  var range_dvalue = range.getDisplayValues();
  
  // aumentar a dimensao da matriz para 2 dimensoes 
  var j,i;
  for ( i = 0 ; i < range_value.length; i++) 
  {
    matrix[i] = [];
    
    // e guardar os valores no elemento Cell.value definir por defeito os Spans para 1
    for ( j = 0 ; j < range_value[i].length; j++) 
      matrix[i][j] = cell({dvalue: range_dvalue[i][j].replace(myRe,myReplacer), //dvalue has user defined chars escaped 
                           value: range_value[i][j], 
                           rowSpan: 1, 
                           colSpan: 1});
  }
    

 //Vetor de MergedRanges
  var mergedRanges = range.getMergedRanges();
  
  var numRows,numCols,row,col,k,l,m;
  
  //Para cada merged range
  for( k=0;k<mergedRanges.length;k++)
  { // Numero de linhas e colunas no mergedRange
    numRows = mergedRanges[k].getNumRows();
    numCols = mergedRanges[k].getNumColumns();
    
    // Posicao do merged range na matriz Cell
    row = mergedRanges[k].getRow() - range.getRow();
    col = mergedRanges[k].getColumn() - range.getColumn();
    
    // Row span the element according to the number of rows inside the merged range
    matrix[row][col].rowSpan=numRows;
    
    // Column span the elemets below the first one and inside the merged range, LateX requierment
    for(l=0;l<numRows;l++)
      matrix[row+l][col].colSpan=numCols; 
    
    // Add a property isHidden to those cells which will not appear on the table because they are part of a column span
    for(m=1;m<numCols;m++)
      matrix[row][col+m].isHidden=true;
    
  }
  
  
  return matrix;
}
