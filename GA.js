/*
Utilities for Google Analytics and GATrack.js
*/

function getHashedEmail(){
  // From https://mashe.hawksey.info/2018/04/google-apps-script-patterns-google-analytics-in-google-add-ons-and-apps-script-projects/#Using_doNotTrack
  // based on https://stackoverflow.com/a/27933459
  userEmail = Session.getEffectiveUser().getEmail()
  var hashedEmail = Utilities.computeHmacSha256Signature(userEmail,
    "The Legendaries").reduce(function(str, chr){
      chr = (chr < 0 ? chr + 256 : chr).toString(16);
      return str + (chr.length == 1 ? '0' : '' ) + chr;
  },'');
  return hashedEmail;
}


function insertGABase(obj) {
  // To avoid having to always include this
  var appSettings = getGASettings();
  var isDev = appSettings["devMode"];
  if(isDev){
    var ip = appSettings["GA_UIP_DEV"];
  }else{
    var ip = appSettings["GA_UIP"];
  }
  var base = {
    uip: ip,
    ua: appSettings["GA_DEFAULT_UA"],
  }
  for (var a in base) {
    obj[a] = base[a];
  }
  return obj;
}

function addToGA(obj){
  // Convenience wrapper
  var obj = insertGABase(obj);
  obj["t"] = "event";
  obj["ec"] = "Add-on usage";
  GATrack.addToGA(obj);
}

function addGAMenuClick(obj){
  obj["ea"] = "Menu click";
  addToGA(obj);
}

GAInitDone = false;

function initGA(){
  if(onOpenAuthMode !== ScriptApp.AuthMode.NONE && GAInitDone === false){
    // Properties service and URLFetchApp can only run when not in AuthMode.NONE
    var TID = getGASettings()["GA_TID"];
    userEmail = Session.getEffectiveUser().getEmail();
    hashedEmail = getHashedEmail(userEmail);
    GATrack.init(TID, hashedEmail);
    GAInitDone = true;
  }
}
