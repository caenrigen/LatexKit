
//Creates and returns a cell object
function cell(spec)
{
  
  var that={dvalue  : spec.dvalue,
            value   : spec.value,
            rowSpan : spec.rowSpan,
            colSpan : spec.colSpan};
  
  return that;
}

//Cria uma matriz das estruturas Cell e guarda lá os valores do range
function create_matrix(range)
{
  // matriz a retornar no final da funcao
  var matrix = []; 
  // variavel local para ter os valores que estao no range
  var range_value  = range.getValues();
  var range_dvalue = range.getDisplayValues();

  // aumentar a dimensao da matriz para 2 dimensoes 
  var j,i;
  for ( i = 0 ; i < range_value.length; i++) 
  {
    matrix[i] = [];
    
    // e guardar os valores no elemento Cell.value definir por defeito os Spans para 1
    for ( j = 0 ; j < range_value[i].length; j++) 
      matrix[i][j] = cell({dvalue: range_dvalue[i][j], value: range_value[i][j], rowSpan: 1, colSpan: 1});
  }
    

 //Vetor de MergedRanges
  var mergedRanges = range.getMergedRanges();
  
  var numRows,numCols,row,col,k,l,m;
  
  //Para cada merged range
  for( k=0;k<mergedRanges.length;k++)
  { // Numero de linhas e colunas no mergedRange
    numRows = mergedRanges[k].getNumRows();
    numCols = mergedRanges[k].getNumColumns();
    
    // Posicao do merged range na matriz Cell
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