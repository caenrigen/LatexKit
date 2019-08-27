// Donations server side functions

function showPayPalDonations() {
  var userInterface = HtmlService
  .createTemplateFromFile('PayPal-donations')
  .evaluate()
  .setWidth(400)
  .setHeight(350);
  SpreadsheetApp.getUi().showModalDialog(userInterface, "You Rock!");
}