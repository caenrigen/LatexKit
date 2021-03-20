//  This function runs when a spreadsheet file is opened
//  Adds options to menu, if the code is inside an add-on it will add the options in a submenu  in Add-ons
onOpenAuthMode = null;

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
  // GA will only work after authentication
  // it needs to also be called in each menu function!
  onOpenAuthMode = e.authMode; // Save as global var to accessible from `initGA`
  initGA();
}

function onInstall(e){
  onOpen(e);
  // Perform additional setup as needed.
}
