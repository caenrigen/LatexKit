//  This function runs when a spreadsheet file is opened
//  Adds options to menu, if the code is inside an add-on it will add the options in a submenu  in Add-ons

function onOpen(e){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('LatexKit')
  .addItem('Make Tabular', 'menuMakeTabular')
  .addItem('Export All Tabulars', 'menuExportAllTabs')
  .addSeparator()
  .addItem('Show Settings', 'menuShowSettingsSheet')
  .addItem('Update Settings', 'updateSettingsSheet')
  .addSeparator()
  .addItem('Export Data', 'menuExportData')
  .addItem('Export All Data', 'menuExportAllData')
  .addItem("getSheet", 'getSheet')
  .addToUi();
}

function onInstall(e){
  onOpen(e);
  // Perform additional setup as needed.
}