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
    var response = ui.prompt('Your unique CODE goes here:');
    if(getFormsUnlockKeys()[response.getResponseText()]){
      userProperties.setProperty(myPropertyName, 'true');
      ui.alert('Code Accepted. Thank you so much!');
    }
  }
  var funcNames = {
    menuMakeTabularFunc : menuMakeTabular,
    menuExportAllTabsFunc : menuExportAllTabs,
    menuShowSettingsSheetFunc : menuShowSettingsSheet,
    updateSettingsSheetFunc : updateSettingsSheet,
    menuExportDataFunc : menuExportData,
    menuExportAllDataFunc : menuExportAllData
  };
  
  if(funcNames[funcName]) funcNames[funcName]();
}

function makeHTMLtext(funcName){
  var href = '<a href="https://goo.gl/forms/a5eweXqgkFmIX8092" target="blank">short Survey (click here)</a>';
  var button = '<input type="button" value="I have my CODE" onclick="google.script.run.withSuccessHandler().validateKeyPrompt(\''+ funcName +'\')" />';
  return "<!DOCTYPE html>\
<html>\
  <head>\
    <base target='_top'>\
  </head>\
  <body>\
   <p>Dear user,</p>\
<p>We believe that time is our most valuable asset and we hope that our work has saved you a fortune! Today we need your help.</p>\
<p>On January 28, 2019 our Add-on will stop working due to changes in the Google's infrastructure. Even though these changes are for the best of the ecosystem, it requires additional work from our side in order to comply with the new rules.</p>\
<p>Therefore, we would like to know how valuable is LatexKit to you. We kindly ask you to take this "+ href +". It takes less than manually creating a table ;). Your feedback is essencial to keep us going.</p>\
<p>We apologize for interrupting your workflow, it is the only way we have to get in touch with you. By the end of the survey, you will be provided with your unique CODE that will disable this prompt :)</p>\
<p>Make sure to SAVE it!</p>\
<p>P.S. Having more positive than negative interactions improves your day-to-day experience. Create some good moments today!</p>\
<p>"+ button +"</p>\
  </body>\
</html>"
}

function showSurveyAlert(funcName){
  if(PropertiesService.getUserProperties().getProperty('LateKitFormV1Filled') !== 'true'){
    var htmlOutput = HtmlService.createHtmlOutput(makeHTMLtext(funcName))
    .setWidth(550)
    .setHeight(500);
    SpreadsheetApp.getUi().showModelessDialog(htmlOutput, 'LatexKit needs your help!');
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