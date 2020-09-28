function beginTable(spec){
  var colFeats = spec.colFeats;
  var matrix   = spec.matrix;
  var tableType = spec.tableType;
  var tableName = spec.tableName;
  var output = '';
  
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
  }
  else{
    getTableTypeError(tableType);
  }
  return output;
}

function endTable(tableType){
  var output = '';
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
    getTableTypeError(tableType);
  }
  return output;
}
