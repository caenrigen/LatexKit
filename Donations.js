// Donations server side functions

function showPayPalDonations() {
  addGAMenuClick({
    el: 'showPayPalDonations',
  });
  try{
    initGA();
    var userInterface = HtmlService
    .createTemplateFromFile('PayPal-donations')
    .evaluate()
    .setWidth(400)
    .setHeight(350);
    SpreadsheetApp.getUi().showModalDialog(userInterface, "You Rock!");
  }
  catch(error) {
    myPrint(error);
  }
}
