////  Old functions, to be upgraded for use with new settings and tabular making
//
//function mkHlines(tabRowsNum, tabSettings){
//  var hlines = strArr(tabRowsNum+1);
//  var srt='\\hline';
//  if(tabSettings[1] === true){
//    hlines[0]=srt;
//    hlines[hlines.length-1]=srt;
//    hlines[tabSettings[2]]=srt;
//  }
//  return hlines;
//}
//
//function mkBigstrut(hlines, nonEmpty){
//  var bigstruts = strArr(hlines.length-1);
//  if(nonEmpty === true){
//    var hlinesLen = hlines.length;
//    var opt = '';
//    for(var i=1;i<bigstruts.length;i++){
//      opt+=(hlines[i-1] !== '')?('t'):('');
//      opt+=(hlines[i+1] !== '')?('b'):('');
//      if(opt.length>0) bigstruts[i]=opt;
//    }
//  }
//  return bigstruts;
//}
//
//function menuMkHlines(){
//  var s = ['default',true,0,true,false];
//  var hline = mkHlines(4,s);
//  var b = mkBigstrut(hline, true);
//  for(var i=0;i<b.length;i++){
//    Logger.log(b[i]);
//  }
//}