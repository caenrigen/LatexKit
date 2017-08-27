//function mkTabularStr(dataMatrix,columnsAlign,skipMatrix,hline){
//  var numRows = dataMatrix.length;
//  var lastLine = numRows - 1;
//  var numCols = dataMatrix[0].length;
//  if(skipMatrix === undefined) skipMatrix=createSkipMatrix(numRows, numCols);
//  var strRows = "";
//  var bigstrutHline = (numRows>2)?([(hline)?(" \\bigstrut \\\\\n\\hline"):(" \\\\"),(hline)?(" \\bigstrut[t] \\\\"):(" \\\\"),(hline)?(" \\bigstrut[b] \\\\"):("")])
//  :([(hline)?(" \\bigstrut \\\\\n\\hline"):(" \\\\"),(hline)?(" \\bigstrut \\\\"):("")]);
//  
//  strRows += "\\begin{tabular}";
//  strRows += "{" + columnsAlign + "}\r\n"
//  if(hline) strRows += "\\hline\r\n";
// 
//  for (var i = 0; i < numRows; i++) {  
//   for (var j = 0; j < numCols; j++){  
//    strRows += dataMatrix[i][j];
//    j += skipMatrix[i][j];
//    if(j < numCols-1)  
//     strRows += " & ";
//   }
//    switch(i) {
//      case 0:
//        strRows += bigstrutHline[0];
//        break;
//      case 1:
//        strRows += bigstrutHline[1];
//        break;
//      case lastLine:
//        strRows += bigstrutHline[2];
//        break;
//      default:
//        strRows += " \\\\";
//    }
//    strRows += "\r\n";
//   }  
//  if(hline) strRows += "\\hline\r\n";
//  strRows += "\\end{tabular}\r\n";
//  return strRows;
//}