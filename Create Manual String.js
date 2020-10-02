function create_manual_string(spec) {
  // Get the arguments from object spec
  var range    = spec.range;
  var matrix   = spec.matrix;
  var colFeats = spec.colFeats;
  var new_range = range.offset(-1, range.getNumColumns() , range.getNumRows()+1 , 1)
  var new_range_value = new_range.getValues();
  var manualColSpec = spec.manualColSpec;
  var tableType = spec.tableType;
  var tableCaption = spec.tableCaption;
  var counterstart = 0;
  var output = '';
  var colAlign = '';

  if(manualColSpec !== ''){
    // Use users specification in case the cell above the table corner is
    // not empty
    colAlign = manualColSpec;
  } else {
    colAlign = colFeats;
  }
  spec.colFeats = colAlign;
  var prepost = setTablePrePost({colFeats:columns_align(colFeats),matrix:matrix,tableType:tableType, tableCaption: tableCaption, range:spec.range});
  output+=prepost.pre_table;

  var i,j;
  for(i=0;i<matrix.length;i++)
  {
    for(j=counterstart;j<matrix[i].length;j++)
    {
     output+=matrix[i][j].pvalue;
    }
    output+='\\\\' + new_range_value[i+1][0] + '\r\n';
  }

  output+=prepost.post_table;

  return output;

}
