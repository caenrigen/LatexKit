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

function myPrint(arg){
  Logger.log(arg);
  console.log(arg);
}
