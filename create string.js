function create_string(spec) {
  // Get the arguments from object spec
  var matrix   = spec.matrix;
  var colFeats = spec.colFeats;
  var rowFeats = spec.rowFeats;
  var tableType = spec.tableType;
  var tableCaption = spec.tableCaption;
  var tableLabel = spec.tableLabel;
  var tablePlacementSpecifier = spec.tablePlacementSpecifier;
  var counterstart = 0;
  var output = '';

  var prepost = setTablePrePost({
    colFeats: columns_align(colFeats),
    matrix: matrix,
    tableType: tableType,
    tableCaption: tableCaption,
    tableLabel: tableLabel,
    tablePlacementSpecifier: tablePlacementSpecifier,
    range: spec.range});

  counterstart = prepost.counterstart;
  output+=prepost.pre_table;

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

  output+=prepost.post_table;

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
