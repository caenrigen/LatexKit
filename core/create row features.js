function rowFeat()
{
  var that={};
  
  //private members
  var hline       = false;
  var bigstrutTop = false;
  var bigstrutBot = false;

  
  //getters
  that.get_hline       = function(){ return hline;  }
  
  that.get_bigstrutTop = function(){ return bigstrutTop;  }
  
  that.get_bigstrutBot = function(){ return bigstrutBot;  }
  
  // setter
  that.set_hline       = function(){  hline=true;  }
  
  that.set_bigstrutTop = function(){  bigstrutTop = true;  }
  
  that.set_bigstrutBot = function(){  bigstrutBot = true;  }
  
//  // resetters (not in use)
//  that.reset_hline       = function(){ hline = false; }
//  
//  that.reset_bigstrutTop = function(){ bigstrutTop = false; }
//  
//  that.reset_bigstrutBot = function(){ bigstrutBot = false; }
 
  return that;
}

function RowFeats(l)
{  
  var that={};
  
  //private members
  var hline       = [];
  var bigstrutTop = [];
  var bigstrutBot = [];

  var prefix = [];
  var sufix  = [];
  
  prefix[0]='';
  sufix[0] ='';
  
  for(var k = 1 ; k<l ; k++){ 
    prefix[k] = "";
    sufix[k]  = "\\\\";
  }
  
  //getters
  that.get_prefix = function(i){return prefix[i];}
  
  that.get_sufix  = function(i){return (sufix[i]+'\r\n');}
  
  that.get_hline       = function(i){ return hline[i];  }
  
  that.get_bigstrutTop = function(i){ return bigstrutTop[i];  }
  
  that.get_bigstrutBot = function(i){ return bigstrutBot[i];  }
  
  
  // setter
  that.set_prefix = function(x){ prefix[i] = x; }
  
  that.set_sufix  = function(x){ sufix[i]  = x; }
  
  
  that.sufix_addToEnd = function(i,x){sufix[i]+=x;}
  that.sufix_addToBeg = function(i,x){sufix[i]=(x+sufix[i]);}
  
  that.prefix_addToEnd = function(i,x){prefix[i]+=x;}
  that.prefix_addToBeg = function(i,x){prefix[i]=x+prefix[i];}
  
  that.set_hline       = function(i){  hline[i]=true;  }
  
  that.set_bigstrutTop = function(i){  bigstrutTop[i] = true;  }
  
  that.set_bigstrutBot = function(i){  bigstrutBot[i] = true;  }
  
//  // resetters (not in use)
//  that.reset_hline       = function(){ hline = false; }
//  
//  that.reset_bigstrutTop = function(){ bigstrutTop = false; }
//  
//  that.reset_bigstrutBot = function(){ bigstrutBot = false; }
  
  return that;
}