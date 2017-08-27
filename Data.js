function datumToStr(obj){
  
  var range = obj.range,
      settingsArray = obj.settingsArray,
      datumSettings = getDatumSettingsFromArray(settingsArray);
//  Select between full precision and displayed values
  if(datumSettings.getFullPrecision()){
    var values=range.getValues();
  }
  else{
    var values=range.getDisplayValues();
  }
//  Use a know separator or the user string
  var separators = getDevSettings().getDataColSeparators();
  if(separators.hasOwnProperty(datumSettings.getSep())){
    var sep = separators[datumSettings.getSep()];
  } else {
    var sep = datumSettings.getSep()+'';
  }
  var str='';
  var line='';
  var rNum=range.getNumRows();
//  Choose between column swap
  if(datumSettings.getColumnSwap() === false){
    var cNum=range.getNumColumns();
    for(var r=0; r<rNum; r++)
    {
      line='';
      for(var c=0; c<cNum; c++)
      {
        line+=values[r][c]+sep;
      };
      line=line.slice(0,-sep.length);
      str+=line+'\r\n';
    };
  }
  else{
    var colNumStrings = datumSettings.getColumnSwap().split('c');
    for(var r=0; r<rNum; r++)
    {
      line='';
      for(var i=1;i<colNumStrings.length;i++)
      {
        line+=values[r][parseInt(colNumStrings[i])-1]+sep;
      };
      line=line.slice(0,-sep.length);
      str+=line+'\r\n';
    };
  }
  return str;
}