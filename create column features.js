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