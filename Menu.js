//  This function runs when a spreadsheet file is opened
//  Adds options to menu, if the code is inside an add-on it will add the options in a submenu  in Add-ons

function onOpen(e){
  var ui = SpreadsheetApp.getUi();
  var menuLabels = getDevSettings().getMenuLabels();
  ui.createMenu('LatexKit')
  .addItem(menuLabels['singleTabular'], 'menuMakeTabular')
  .addItem(menuLabels['allTabular'], 'menuExportAllTabs')
  .addSeparator()
  .addItem(menuLabels['showSettings'], 'menuShowSettingsSheet')
  .addItem(menuLabels['updateSettings'], 'updateSettingsSheet')
  .addSeparator()
  .addItem(menuLabels['singleData'], 'menuExportData')
  .addItem(menuLabels['allData'], 'menuExportAllData')
  .addSeparator()
  .addItem('blabla', 'testNew')
  .addToUi();
}

function onInstall(e){
  onOpen(e);
  // Perform additional setup as needed.
}
function test(){
  Logger.log(getFormsUnlockKeys()["Y8BI1LXKBMJ6RZE8687U"]);
}

function testNew(){
  showAnchor('Stackoverflow','https://www.google.com');
}

function showAnchor(name,url) {
//  var html = '<html><body><a href="'+url+'" target="blank" onclick="google.script.host.close()">'+name+'</a></body></html>';
  var html = '<html><body><a href="'+url+'" target="blank">'+name+'</a></body></html>';
  var ui = HtmlService.createHtmlOutput(html)
  SpreadsheetApp.getUi().showModelessDialog(ui,"demo");
}