function create_string(spec) {
  // Get the arguments from object spec
  var matrix   = spec.matrix;
  var colFeats = spec.colFeats;
  var rowFeats = spec.rowFeats;
  var tableType = spec.tableType;
  var tableName = spec.tableName;
  var counterstart = 0;
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
  }else{
    if (tableType.length){
      SpreadsheetApp.getUi().alert("Invalid Table Type.\nUse : tabular, tabularx or longtable");
    }else{
      SpreadsheetApp.getUi().alert("Table Type not defined.\nUse : tabular, tabularx or longtable");
    }
  }
  if(rowFeats[0].get_hline())
    output += ' \\hline\r\n';
  
  var i,j;
  for(i=counterstart;i<matrix.length;i++)  
  {
    for(j=0;j<matrix[i].length;j++)
    {
     output+=matrix[i][j].pvalue; 
    }
    if(rowFeats[i+1].get_bigstrutTop()){
      output+='\\bigstrut';
      if(rowFeats[i+1].get_bigstrutBot()){}
      else output+='[t]'    
    }
    else if(rowFeats[i+1].get_bigstrutBot())
     output+='\\bigstrut[b]'; 
      
    output+='\\\\';
    if(rowFeats[i+1].get_hline())
      output+=' \\hline';
      
    output+='\r\n';
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

function columns_align(colFeats){
  
 var str='';
  
  for(var i=0;i<colFeats.length;i++)
  {
    if(colFeats[i].get_lbar())
      str+='|';
    
    switch (colFeats[i].alignment) {
      case 'left':
        str+='l';
        break;
      case 'center':
        str+='c';
        break;
      case 'right':
        str+='r';
        break;
        
      default:
        str+='c';
    }
    if(colFeats[i].get_rbar())
      str+='|';
  }
  return str;
}