// This function ajusts the matrix to add a member called matrix.errValue which is meant to store the value of the error associated with the matrix.value element
// The argument is intended to be {matrix: some_matrix, colFeats: some_colFeats}
function err_handler(spec) {
  
  // Get the arguments from object spec
  var matrix = spec.matrix;
  var colFeats = spec.colFeats;
  
  // Scan through the column features array to see if any column has an uncertainty
  var i,k;
  for( i=0;i<(colFeats.length - 1);i++)
  {
     // If one column has uncertainties, read them from the next column and store them to a new element 'errValue'
   if(colFeats[i].get_pmError())
   {
     for( k=0 ; k<matrix.length ; k++)
     {
       // Do this only if both the value and the allegedly uncertainty are both numbers
       if(typeof matrix[k][i].value === 'number' && typeof matrix[k][i+1].value ==='number')
         matrix[k][i].errValue = matrix[k][i+1].dvalue;
       
       //Deprecated, now done using decrese_colSpan_of_last
//       // If the matrix element is column spanned, now it has to be one less, since we are deleting the column of uncertainties
//       if(matrix[k][i].colSpan>1)
//         matrix[k][i].colSpan--; 
       decrease_colSpan_of_last(matrix,k,i);
       
       // Delete the element that carried the uncertainty
       // At the end of the cicle all the column of uncertainties will be gone
       matrix[k].splice(i+1,1);
     }
     // Delete the column features obj associated with the uncertainty column
     colFeats.splice(i+1,1);
     
   }
    
  }
  
  return 0;
  
}
// Decreases the colSpan of the last active cell from grid position (row,col),
// if the cell has colSpan>1
// Also decreases the colSpan of the cells below,
// if the cell is rowSpanned
function decrease_colSpan_of_last(matrix,row,col)
{
  var i,j;
  for(i=0; i<=col ;i++)
    if(matrix[row][col-i].isHidden !== true){
      
      if(matrix[row][col-i].colSpan>1)
        for(j=0 ; j<matrix[row][col-i].rowSpan ;j++)
          matrix[row+j][col-i].colSpan--;
      
      return 1;
    }
  return -1;
}