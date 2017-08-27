function colFeat()
{
  var that={};
  
  //private members
  var pmError = false;
  var sdError = false;
  var lbar    = false;
  var rbar    = false;
  
  //public member functions for set reset and read
  // getters
  that.get_pmError = function(){ return pmError; }
  
  that.get_sdError = function(){ return sdError; }
  
  that.get_lbar    = function(){ return lbar; }
  
  that.get_rbar    = function(){ return rbar; }
  
  // setters
  that.set_pmError = function(){ pmError=true; }
  
  that.set_sdError = function(){ sdError = true; }
  
  that.set_lbar    = function(){ lbar = true; }
  
  that.set_rbar    = function(){ rbar = true; }
  
  // resetters
  that.reset_pmError = function(){ pmError = false; }
  
  that.reset_sdError = function(){ sdError = false; }
  
  that.reset_lbar    = function(){ lbar = false; }
  
  that.reset_rbar    = function(){ rbar = false; }
  
  
  return that;
}
//
//function create_colFeat(range)
//{
//  
//  // variavel local para ter os valores que estao no range
//  var values = range.getDisplayValues();
//  var numColumns = range.getNumColumns();
//  
//  //Vetor de estruturas ColFeat que guarda as caracteristicas de cada coluna
//  var colFeats = [];
//                        
//  for(var k=0;k<numColumns;k++)
//    colFeats[k] = colFeat();
//  
//  // Comecar pelo canto de cima direita e ir pela matriz abaixo 
//  // ate encontrar uma referencia a keyword "err", parar quando encontrar
//  for(k=1;k<numColumns;k++)
//    for(var i=0;i<values.length;i++) 
//    {
//      if(values[i][k] === getDevSettings().getErrorColumnTag())
//      {
//        colFeats[k - 1].set_pmError();
//        break;
//      }
//      if(values[i][k] === 'sd')
//      {
//        colFeats[k - 1].set_sdError();
//      }
//    }
//  return colFeats;
//}