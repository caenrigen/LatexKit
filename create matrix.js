// This file contains comments in portuguese to be translated someday
function escapeCharsReplacer(escapeChar){ 
// This function is called by method string.replace() to correctly escape LaTex characters
	var escapeCharsDict = {
	// This distionary contains the substitutions to be performed
	 '&':'\\&',
	 '%':'\\%',
	 '$':'\\$',
	 '#':'\\#',
	 '_':'\\_',
	 '{':'\\{',
	 '}':'\\}',
	 '~':'\\textasciitilde',
	 '^':'\\textasciicircum',
	 '\\':'\\textbackslash'
	};
	return escapeCharsDict.hasOwnProperty(escapeChar)?escapeCharsDict[escapeChar]:escapeChar;
}

//Creates and returns a cell object
function cell(spec){
  var that={dvalue  : spec.dvalue,
            value   : spec.value,
            rowSpan : spec.rowSpan,
            colSpan : spec.colSpan};
  
  return that;
}
// Creates a matrix of Cell structures and saves the range values in it
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
  // This line of code does the same as the four below  but is harder do read :)
  escapeChars = escapeChars.replace (/[\^\-\]\\]/g, '\\$&');
//  escapeChars = escapeChars.replace('\\', '\\\\');
//  escapeChars = escapeChars.replace('\^', '\\\^');
//  escapeChars = escapeChars.replace('\-', '\\\-');
//  escapeChars = escapeChars.replace('\]', '\\\]');
  
  // Create a regular expression for escaping user defined characters
  var escapeCharsReg = new RegExp('\['+escapeChars+'\]', 'g');
    
  // The matrix returned at the function end
  var matrix = []; 
  // Local var for the values in the range
  var range_value  = range.getValues();
  var range_dvalue = range.getDisplayValues();
  
  // Increase matrix dimension to 2
  var j,i;
  // Checking here if there are any special chars to be escaped avoides running 
  // a search in each cell
  if(escapeChars===''){
  Logger.log('No escape chars!\n');
  for ( i = 0 ; i < range_value.length; i++){
    matrix[i] = [];
    
    // Save values in each Cell and define default spans to 1
    for ( j = 0 ; j < range_value[i].length; j++) 
      matrix[i][j] = cell({dvalue: range_dvalue[i][j],
                           value: range_value[i][j], 
                           rowSpan: 1, 
                           colSpan: 1});
  }
  }else{
  for ( i = 0 ; i < range_value.length; i++){
    matrix[i] = [];
    
    // Save values in each Cell and define default spans to 1
    for ( j = 0 ; j < range_value[i].length; j++) 
      matrix[i][j] = cell({ //dvalue has user defined chars escaped 
                           dvalue: range_dvalue[i][j].replace(escapeCharsReg,escapeCharsReplacer),
                           value: range_value[i][j], 
                           rowSpan: 1, 
                           colSpan: 1});
  }
  }

 //Array of MergedRanges
  var mergedRanges = range.getMergedRanges();
  
  var numRows,numCols,row,col,k,l,m;
  
  //For each merged range
  for( k=0;k<mergedRanges.length;k++){
  	// Number of rows and columns in each merged Range
    numRows = mergedRanges[k].getNumRows();
    numCols = mergedRanges[k].getNumColumns();
    
    // Merged range position in the Cell matrix
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
