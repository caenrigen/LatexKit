function create_manual_string(spec) {
  // Get the arguments from object spec
  var range    = spec.range;
  var matrix   = spec.matrix;
  var colFeats = spec.colFeats;
  var new_range = range.offset(-1, range.getNumColumns() , range.getNumRows()+1 , 1)
  var new_range_value = new_range.getValues();
  var manualColSpec = spec.manualColSpec;
  var tableType = spec.tableType;
  var tableName = spec.tableName;
  var counterstart = 0;
  var output = '';
  var colAlign = '';

  if(manualColSpec !== ''){
    // Use users specification in case the cell above the table corner is
    // not empty
    colAlign = manualColSpec;
  } else {
    colAlign = columns_align(colFeats);
  }

  if (tableType=="longtable"){
    counterstart = 1;
    output += "\\begin{longtable}";
    output += "{" + columns_align(colFeats) + "}\r\n";
    output += "\\caption{"+tableName+"}\\\\ \\hline\n";
    output += "\\label{tab:"+tableName.replace(/\s/g, '').trim()+"}\r\n";
    for(c=0;c<matrix[0].length;c++)
    {
     output += matrix[0][c].pvalue;
    }
    output += "\\\\ \n";
    output += "\\hline\n";
    output += "\\endfirsthead\n";
    output += "\\multicolumn{" + String(colFeats.length)+"}{c}%\n";
    output += "\{\\tablename\ \\thetable\ -- \\textit{Continued from previous page}} \\\\ \n";
    output += "\\hline\n";
    for(c=0;c<matrix[0].length;c++)
    {
     output += matrix[0][c].pvalue;
    }
    output += "\\\\ \n";
    output += "\\hline\n";
    output += "\\endhead\n";
    output += "\\hline \\multicolumn{" + String(colFeats.length) +"}{r}{\\textit{Continued on next page}} \\\\ \n"
    output += "\\endfoot\n";
    output += "\\hline\n";
    output += "\\endlastfoot\n";
    output += "\\hline\n";
  }
  else if (tableType=="tabular"){
    output += "\\begin{tabular}";
    output += "{" + columns_align(colFeats) + "}\r\n";
  }else if (tableType=="tabularx"){
    output += "\\begin{tabularx}";
    output += "{\\textwidth}";
    output += "{" + columns_align(colFeats) + "}\r\n";
  }else{
    if (tableType.length){
      SpreadsheetApp.getUi().alert("Invalid Table Type.\nUse : tabular, tabularx or longtable");
    }else{
      SpreadsheetApp.getUi().alert("Table Type not defined.\nUse : tabular, tabularx or longtable");
    }
  }


  var i,j;
  for(i=0;i<matrix.length;i++)
  {
    for(j=counterstart;j<matrix[i].length;j++)
    {
     output+=matrix[i][j].pvalue;
    }
    output+='\\\\' + new_range_value[i+1][0] + '\r\n';
  }

  if (tableType=="longtable"){
    output+= "\\end{longtable}\r\n";
  }
  else if (tableType=="tabular"){
    output+= "\\end{tabular}\r\n";
  }
  else if (tableType=="tabularx"){
    output += "\\end{tabularx}\r\n";
  }
  else{
    if (tableType.length){
      SpreadsheetApp.getUi().alert("Invalid Table Type.\nUse : tabular, tabularx or longtable");
    }
    else{
      SpreadsheetApp.getUi().alert("Table Type not defined.\nUse : tabular, tabularx or longtable");
    }
  }
  return output;

}
