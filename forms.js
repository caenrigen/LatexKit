function onOpen(e){
  var ui = SpreadsheetApp.getUi();
  var menuLabels = getDevSettings().getMenuLabels();
  ui.createMenu('LatexKit')
  .addItem(menuLabels['singleTabular'], 'menuMakeTabularForm')
  .addItem(menuLabels['allTabular'], 'menuExportAllTabsForm')
  .addSeparator()
  .addItem(menuLabels['showSettings'], 'menuShowSettingsSheetForm')
  .addItem(menuLabels['updateSettings'], 'updateSettingsSheetForm')
  .addSeparator()
  .addItem(menuLabels['singleData'], 'menuExportDataForm')
  .addItem(menuLabels['allData'], 'menuExportAllDataForm')
  .addToUi();
}

function validateKeyPrompt(funcName){
  var userProperties = PropertiesService.getUserProperties();
  
  //userProperties.deleteAllProperties();
  
  var myPropertyName = 'LateKitFormV1Filled';
  if(userProperties.getProperty(myPropertyName) !== 'true'){
    userProperties.setProperty(myPropertyName, 'false');
    var ui = SpreadsheetApp.getUi();
    var response = ui.prompt('Hello');
    if(getFormsUnlockKeys()[response.getResponseText()]) userProperties.setProperty(myPropertyName, 'true');
  }
  var funcNames = {
    menuMakeTabularFunc : menuMakeTabular,
    menuExportAllTabsFunc : menuExportAllTabs,
    menuShowSettingsSheetFunc : menuShowSettingsSheet,
    updateSettingsSheetFunc : updateSettingsSheet,
    menuExportDataFunc : menuExportData,
    menuExportAllDataFunc : menuExportAllData
  };
  funcNames[funcName]();
}

function makeHTMLtext(funcName){
  return '<!DOCTYPE html>\
<html>\
  <head>\
    <base target="_top">\
  </head>\
  <body>\
    <a href="https://goo.gl/forms/a5eweXqgkFmIX8092" target="blank">Something</a>\
    <input type="button" value="OK" onclick="google.script.run.withSuccessHandler().validateKeyPrompt(\''+ funcName +'\')" />\
  </body>\
</html>'
}

function showSurveyAlert(funcName){
  if(PropertiesService.getUserProperties().getProperty('LateKitFormV1Filled') !== 'true'){
    var htmlOutput = HtmlService.createHtmlOutput(makeHTMLtext(funcName));
    //.setSandboxMode(HtmlService.SandboxMode.IFRAME)
    //.setWidth(250)
    //.setHeight(200);
    SpreadsheetApp.getUi().showModelessDialog(htmlOutput, 'HELP');
  } else validateKeyPrompt(funcName);
}

function menuMakeTabularForm(){
  showSurveyAlert('menuMakeTabularFunc');
}

function menuExportAllTabsForm(){
  showSurveyAlert('menuExportAllTabsFunc');
}

function menuShowSettingsSheetForm(){
  showSurveyAlert('menuShowSettingsSheetFunc');
}

function updateSettingsSheetForm(){
  showSurveyAlert('updateSettingsSheetFunc');
}

function menuExportDataForm(){
  showSurveyAlert('menuExportDataFunc');
}

function menuExportAllDataForm(){
  showSurveyAlert('menuExportAllDataFunc');
}

function getFormsUnlockKeys() {
  return {
    "YGF32PME51Z44JTJN3E3": true,
    "7TATXKVDJ62VISMFPI94": true,
    "LA0F3Y4QF0W82NA1HGKV": true,
    "GFTGG6U5SOW2SA0HV6MJ": true,
    "1M0BGYDDP80IGWA5GVR4": true,
    "2351QCALQX44A9XW5MVN": true,
    "HRIEWY0WKOIO4OSL80XB": true,
    "O8U1BQ9Q3T2QTNO35U0J": true,
    "5QB9G4MQCB5L34PHLCLW": true,
    "OT8CV1BPWVART51OUY1V": true,
    "SX235NMYNAQCIFFOUTPK": true,
    "45SLN87SYGV012KZRZ0Q": true,
    "THVCIQNZ9QUU6P19TN1X": true,
    "C1NEA4OFZP69WADD4C19": true,
    "L3ON3XQVCSQ7VHNF8NSC": true,
    "MUVUJBP94PA2FBZRZ1T9": true,
    "XLYVC8PHAXK4JGIATD4K": true,
    "BV1C02HZOB1W8B2AIAGA": true,
    "R3LNK1CFQ4ZHTHHOT4N4": true,
    "TM4U0KAECBFJOVITO886": true,
    "K1EFYBUIPN02GX5S8WUM": true,
    "V1ITM9I9ZL08CDELN93R": true,
    "9649JIUPY265XCCVPRZP": true,
    "IANXGPMSU84T6CY82NHK": true,
    "E5WYR17BSJRFGMWQ8DJ0": true,
    "M4U8RY1Q37KEFY5EXHUR": true,
    "8P10Y2DIKQIQKPZ01PK0": true,
    "5GCU4O6QF48AIUW0L0YB": true,
    "G1Q66LGD8PA2LED0DCGL": true,
    "03NVQDUVUHMR61WSQMWJ": true,
    "B4MUL2WSLSHHFS7TZ0LC": true,
    "SKJ8FJN035FSBGCFF6G4": true,
    "V9YOM91697C86BQM9RPC": true,
    "W94XGNC62RSSUBO3YRTG": true,
    "5LMUFL44X50HZUND2HXJ": true,
    "H7DHMVBTULXYDET2483F": true,
    "I3M1RKKMMLM24K4IJ20I": true,
    "BE9M2HS80UP4UI5CGQ3W": true,
    "U9O8R95DWAGRBSDB3LVF": true,
    "Y8BI1LXKBMJ6RZE8687U": true
  }
}
//function test(){
//  Logger.log(makeHTMLtext('menuMakeTabularFunc'));
//}
//
//function testpop () {
//  var htmlOutput = HtmlService
//    .createHtmlOutputFromFile('FormsPopup2')
//    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
//    .setWidth(250)
//    .setHeight(200);
//  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'HELP');
//}
//
//function testNew(){
//  showAnchor('testNew','https://goo.gl/forms/a5eweXqgkFmIX8092');
//}
//
//function showAnchor(name,url) {
////  var html = '<html><body><a href="'+url+'" target="blank" onclick="google.script.host.close()">'+name+'</a></body></html>';
//  var html = '<html><body><a href="'+url+'" target="blank">'+name+'</a></body></html>';
//  var ui = HtmlService.createHtmlOutput(html)
//  SpreadsheetApp.getUi().showModelessDialog(ui,"demo");
//}