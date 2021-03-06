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
  var tableLabel = spec.tableLabel;
  var tablePlacementSpecifier = spec.tablePlacementSpecifier;
  var counterstart = 0;
  var output = '';
  var colAlign = '';

  if(manualColSpec !== ''){
    // Use users specification in case the cell above the table corner is
    // not empty
    colAlign = manualColSpec;
  } else {
    colAlign = columns_align(colFeats);
  };

  var prepost = setTablePrePost({
    colFeats: colAlign,
    range: range,
    matrix: matrix,
    tableType: tableType,
    tableCaption: tableCaption,
    tableLabel: tableLabel,
    tablePlacementSpecifier: tablePlacementSpecifier,
  });

  counterstart = prepost.counterstart;
  output+=prepost.pre_table;

  // Add user specified commands (e.g. \hline) before the tabular rows
  output += new_range_value[0][0] + '\r\n';

  var i,j;
  for(i=counterstart;i<matrix.length;i++)
  {
    for(j=0;j<matrix[i].length;j++)
    {
     output+=matrix[i][j].pvalue;
    }
    output+='\\\\' + new_range_value[i+1][0] + '\r\n';
  }

  output+=prepost.post_table;

  return output;

}
