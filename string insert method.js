//String.prototype.insert = function (pos , insertion)
//{
//  if(Math.abs(pos)>this.length || pos==0)
//    return this;
//  //else
//  if(pos<0)
//    return (this.substring(0,this.length+pos) + insertion + this.substring(this.length+pos,this.length));
//  
//  if(pos>0)
//    return (this.substring(0,pos) + insertion + this.substring(pos,this.length));
//} 	

//function insert_method_test()
//{
//  var str = "O MEFT é um curso";
//  
//  // Insert a string inside another string at position 11 from the begining
//  var str1 = str.insert(11,"a merda de ");
//  // result str1 = 'O MEFT é uma merda de curso'
//  
//  // Insert a string inside another string at position 6 from the end
//  var str2 = str.insert(-6,"a merda de ");
//  // result str2 = 'O MEFT é uma merda de curso'
//  
//  return 0;
//}