//  This function runs when a spreadsheet file is opened
//  Adds options to menu, if the code is inside an add-on it will add the options in a submenu  in Add-ons

function onOpen(e){
  var ui = SpreadsheetApp.getUi();
  var menuLabels = getDevSettings().getMenuLabels();
  ui.createMenu('LatexKit')
  .addItem(menuLabels['singleTable'], 'menuMakeTable')
  .addItem(menuLabels['donateFunny'], 'showPayPalDonations')
  .addItem(menuLabels['allTables'], 'menuExportAllTabs')
  .addSeparator()
  .addItem(menuLabels['showSettings'], 'menuShowSettingsSheet')
  .addItem(menuLabels['updateSettings'], 'menuUpdatesettingSheet')
  .addSeparator()
  .addItem(menuLabels['singleData'], 'menuExportData')
  .addItem(menuLabels['allData'], 'menuExportAllData')
  .addSeparator()
  .addItem(menuLabels['feedbackForm'], 'showFeedbackDialog')
  .addItem(menuLabels['donate'], 'showPayPalDonations')
  .addToUi();

  initGA();
}

function onInstall(e){
  onOpen(e);
  // Perform additional setup as needed.
}
