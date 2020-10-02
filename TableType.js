function setTablePrePost(spec){
  var colFeats = spec.colFeats;
  var matrix   = spec.matrix;
  var tableType = spec.tableType;
  var range = spec.range;
  var tableCaption = spec.tableCaption;
  var pre_table = '';
  var post_table = '';

  
  if (tableType=="longtable"){

    var continue_next = getNextPageContinue(range.offset(range.getNumRows(), 0).getDisplayValue());
    var continue_previous = getPreviousPageContinue(range.offset(range.getNumRows()+1, 0).getDisplayValue());
    
    counterstart = 1;
    pre_table += "\\begin{longtable}";
    pre_table += "{" + colFeats + "}\r\n";
    if(tableCaption){
      pre_table += "\\caption{"+tableCaption+"}\\\\ \\hline\n";
      pre_table += "\\label{tab:"+tableCaption.replace(/\s/g, '').trim()+"}\r\n";
    }
    for(c=0;c<matrix[0].length;c++)
    {
     pre_table += matrix[0][c].pvalue;
    }
    pre_table += "\\\\ \n";
    pre_table += "\\hline\n";
    pre_table += "\\endfirsthead\n";
    pre_table += "\\multicolumn{" + String(colFeats.length)+"}{c}%\n";
    pre_table += continue_previous;
    pre_table += "\\hline\n";
    for(c=0;c<matrix[0].length;c++)
    {
     pre_table += matrix[0][c].pvalue;
    }
    pre_table += "\\\\ \n";
    pre_table += "\\hline\n";
    pre_table += "\\endhead\n";
    pre_table += "\\hline \\multicolumn{" + String(colFeats.length) +"}"+continue_next;
    pre_table += "\\endfoot\n";
    pre_table += "\\hline\n";
    pre_table += "\\endlastfoot\n";
    pre_table += "\\hline\n";
    post_table+= "\\end{longtable}\r\n";
  }
  else if (tableType=="tabular"){
    pre_table += "\\begin{tabular}";
    pre_table += "{" + colFeats + "}\r\n";
    post_table+= "\\end{tabular}\r\n";
  }else if (tableType=="tabularx"){
    pre_table += "\\begin{tabularx}";
    pre_table += "{\\textwidth}";
    pre_table += "{" + colFeats + "}\r\n";
    post_table += "\\end{tabularx}\r\n";
  }
  else{
    getTableTypeError(tableType);
  }
  return {pre_table: pre_table, post_table: post_table};
}
