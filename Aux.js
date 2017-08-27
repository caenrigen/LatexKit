////  Used to create matrixes
//function deepenArray(arr, dim){
//  for (var i=0;i<dim;i++) {
//     arr[i] = [];
//  }
//  return arr;
//}
//
//function strArr(n){
////  Return an array of 'n' empty strings
//  var out=[];
//  for(var i=0;i<n;i++){
//    out.push('');
//  }
//  return out;
//}

//function errorFound(range){
//
//  var values = range.getDisplayValues();
//  var errorFlag = false;
//  
//  //Declare and initiate the array that holds the columns which are uncertainty columns
//  var numColumns = range.getNumColumns();
//  var isErrCol = [];
//  for(var k=0;k<numColumns;k++)
//    isErrCol[k] = false;
//  
//  for(var i=0;i<values.length;i++)
//    for(var j=0;j<values[i].length;j++) 
//      if(values[i][j] === devSettings[2])
//      {
//        isErrCol[j] = true;
//        errorFlag   = true;
//      }
//      
//  return {'Flag':errorFlag, 'isErrCol':isErrCol};
//}
String.prototype.insert = function (pos , insertion)
{
  if(Math.abs(pos)>this.length || pos==0)
    return this;
  //else
  if(pos<0)
    return (this.substring(0,this.length+pos) + insertion + this.substring(this.length+pos,this.length));
  
  if(pos>0)
    return (this.substring(0,pos) + insertion + this.substring(pos,this.length));
} 	

Array.prototype.matrix = function (rowNum, colNum, initial) {
  var a, i, j, mat = [];
  for (i = 0; i < rowNum; i += 1) {
    a = [];
    for (j = 0; j < colNum; j += 1) {
      a[j] = initial;
    }
    mat[i] = a; }
  return mat;
}

Array.prototype.rectangulateMatrix = function (content){
  var maxCol = 0, rowLen, matLen = this.length;
//  Get maximum length inner arrays
  for(var i=0;i<matLen;i++){
    rowLen = this[i].length;
    if(rowLen > maxCol){
      maxCol = rowLen;
    }
  }
  for(var i=0;i<matLen;i++){
    for(var j=this[i].length;j<maxCol;j++){
      this[i][j] = content;
    }
  }
  return this;
}

//function testM(){
//  var rows = 2;
//  var cols = 4;
//  var m = [].matrix(rows, cols, null);
//  Logger.log(m);
//  m[0][m[0].length] = 'hello';
//  Logger.log(m);
//  m.rectangulateMatrix('world');
//  Logger.log(m);
//  m[0][m[0].length+3] = 'something';
//  Logger.log(m);
//}
