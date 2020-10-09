function setTablePrePost(spec){
  var colFeats = spec.colFeats;
  var matrix   = spec.matrix;
  var tableType = spec.tableType;
  var range = spec.range;
  var tableCaption = spec.tableCaption;
  var pre_table = '';
  var post_table = '';
  var counterstart = 0;
  
  if (tableType=="longtable"){

    var continue_next = getNextPageContinue(range.offset(range.getNumRows(), 0).getDisplayValue());
    var continue_previous = getPreviousPageContinue(range.offset(range.getNumRows()+1, 0).getDisplayValue());
    var mcol_width = String(colFeats.replace(/\|/g, '').length);

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
    pre_table += "\\multicolumn{" + mcol_width +"}{c}%\n";
    pre_table += continue_previous;
    pre_table += "\\hline\n";
    for(c=0;c<matrix[0].length;c++)
    {
     pre_table += matrix[0][c].pvalue;
    }
    pre_table += "\\\\ \n";
    pre_table += "\\hline\n";
    pre_table += "\\endhead\n";
    pre_table += "\\hline \\multicolumn{" + mcol_width +"}"+continue_next;
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
  }
  else if (tableType=="tabularx"){
    pre_table += "\\begin{tabularx}";
    pre_table += "{\\textwidth}";
    pre_table += "{" + colFeats + "}\r\n";
    post_table += "\\end{tabularx}\r\n";
  }
  else if (tableType=="table/tabular"){
    pre_table += "\\begin{table}[H]";
    pre_table += "\\centering";
    pre_table += "\\begin{tabular}";
    pre_table += "{" + colFeats + "}\r\n";
    post_table+= "\\end{tabular}\r\n";
    if(tableCaption){
      post_table += "\\caption{"+tableCaption+"}\n";
      post_table += "\\label{tab:"+tableCaption.replace(/\s/g, '').trim()+"}\r\n";
    }
    post_table+= "\\end{table}\r\n";
  }
  else if (tableType=="table/tabularx"){
    pre_table += "\\begin{table}[H]";
    pre_table += "\\centering";
    pre_table += "\\begin{tabularx}";
    pre_table += "{\\textwidth}";
    pre_table += "{" + colFeats + "}\r\n";
    post_table += "\\end{tabularx}\r\n";
    if(tableCaption){
      post_table += "\\caption{"+tableCaption+"}\n";
      post_table += "\\label{tab:"+tableCaption.replace(/\s/g, '').trim()+"}\r\n";
    }
    post_table+= "\\end{table}\r\n";
  }
  else{
    getTableTypeError(tableType);
  }
  return {pre_table: pre_table, post_table: post_table,counterstart: counterstart};
}