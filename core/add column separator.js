//This function adds the column separator & and inserts blanck spaces in order to leave the &'s aligned
// To do this we start on the first column and inspect the length of each element 
// We check the length of the first element and say that this is our biggestest element yet, max_width
// Procede to the next element and check it's length:
// If it's smaller than max_width -> Insert blanck spaces to match max_width
// If it's larger than max width  -> Replaces max_width
// This is done two times for each column and column by column

// We have to check for exceptions like if the element is or is part of a Spanned element
function add_columnSeparator(spec) {
  
    // Get the arguments from object spec
  var matrix = spec.matrix;
  var colFeats = spec.colFeats;
  
  var i,j;
  
  // max_width[j] is the width of 
  // the largest element of column j
  var max_width = [];
  // Initialize all elements of max_width as 0
  for(j=0;j<matrix[0].length; j++)
    max_width[j] = 0; 
  
  // Add the & separator to all pvalue(printing value)
  // Use colSpan as incrment to skip the cells 
  // that are part of merged ranges
  // This way pvalue of merged cells remains "" (empty string)
  for(i=0;i<matrix.length;i++)
  {
    for( j=0 ; (j + matrix[i][j].colSpan) < matrix[i].length ; j += matrix[i][j].colSpan )
    matrix[i][j].pvalue += ' & ';
    
    if(j<matrix[i].length)
      matrix[i][j].pvalue += '   ';
  }
  // lsum[i] is the position of & on line i
  // on the column the function is currently working on
  // ssum[i] is the sum of all spans on line i up to column j

  var lsum = [];
  var ssum = [];
  for (i=0 ; i<matrix.length ; i++)  
  { 
    lsum[i]=0;
    ssum[i]=0;
  }
  
  // Start the correction cycle column by column
  for( j=0; j<matrix[0].length ; j++ )
  {
    // First iteration
    for(i=0 ; i<matrix.length ; i++)
    {
      // If element is not spanned over (part of a merged range)
      // Increment  it's Span to ssum[i]
      if(matrix[i][j].pvalue.length != 0)
        ssum[i] += matrix[i][j].colSpan;
      
      // If ssum[i] matches the column we're on
      // We aren't looking at the middle of a Spanned element
      if(ssum[i] == (j + 1))
      {
        // Increment lsum with the length of all new elements
        // not incremented before, up to column j
        lsum[i] += sizeof_last(matrix[i],j);
        // If current sum of lengths is smaller than max_width[j]
        if(lsum[i] < max_width[j])
        {
          // Increase lebgth of last active cell
          // Not to increase cells spanned over with pvalue = ""
          increase_last(matrix[i],j,max_width[j]-lsum[i]);
          // Acount for the increased element
          lsum[i]=max_width[j];
        }
        // Replace max_width if larger
        else 
          max_width[j]=lsum[i];
      }
    }
    // Second iteration
    for(i=0 ; i<matrix.length ; i++)
      if(ssum[i] == j + 1)
        if(lsum[i] < max_width[j])
        {
          increase_last(matrix[i],j,max_width[j]-lsum[i]);
          lsum[i]=max_width[j];
        }
    
  }
 
// Test lengths for debuging  
//  var total = [];
//  for(i=0 , total[i]=0;i<matrix.length;i++, total[i]=0)
//    for(j=0;j<matrix[i].length;j++)
//      total[i]+=matrix[i][j].pvalue.length;
//      
  return 0;
  
}
// Auxiliar functions

// Inserts 'size' white spaces " "
// On the end of pvalue of the last active element
// Starting from column 'position'
function increase_last(matrix,position,size)
{
  
  var insert_string = '';
  var i;
  for(i=0;i<size;i++)
    insert_string += " ";
  
  for(i=0;i<=position;i++)
    if(matrix[position-i].pvalue.length != 0)
    {
      matrix[position-i].pvalue = matrix[position-i].pvalue.insert(-2,insert_string);
      return i;
    } 
  return -1;
}
  
// returns the length of the last active element starting from column 'position' 
function sizeof_last(matrix,position)
{
  for(var i=0; i<=position ;i++)
    if(matrix[position-i].pvalue.length != 0)
      return matrix[position-i].pvalue.length;
  
  return -1;
}