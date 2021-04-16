function showFeedbackDialog(){
  addGAMenuClick({
    el: 'showFeedbackDialog',
  });
  try{
    initGA();
    var htmlOutput = HtmlService.createHtmlOutput(makeFormHTMLtext())
      .setWidth(550)
      .setHeight(400);
    try {
      SpreadsheetApp.getUi().showModelessDialog(htmlOutput, 'We love to hear from you!');
    } catch(e){
    // Avoid getting an error in Google Project's Console when the user leaves the alert opened
    e.name==="Exception" ? console.info(e) : function(){throw(e);}();
    }
  }
  catch(error) {
    myPrint(error);
  }
  GATrack.flushGAQueue();
}

function makeFormHTMLtext(){
  var hrefForm = '<a href="'+ getDevSettings().getFeedbackFormLink() + '" target="_blank">short Survey (click here)</a>';
  var hrefFacebook = '<a href="'+ getDevSettings().getFacebookLink() + '" target="_blank">Facebook (click here)</a>';
  var hrefGitHub =  '<a href="'+ getDevSettings().getGitHubLink() + '" target="_blank">GitHub (click here)</a>';
  var hrefMail = '<a href="'+ getDevSettings().getMailLink() + '" target="_blank">email (click here)</a>';
  var hrefHomepage = '<a href="'+ getDevSettings().getHomepageLink() + '" target="_blank">Homepage (click here)</a>';
  return '<!DOCTYPE html>\
<html>\
  <head>\
    <base target="_blank">\
  </head>\
  <body>\
   <p>Dear user,</p>\
<p>We believe that time is our most valuable resource and we hope that our work has saved you a fortune!</p>\
<p>We would like to know how valuable is LatexKit to you. We kindly ask you to take this '+ hrefForm +'. It takes less than manually creating a table ;).</p>\
<p>Your feedback is essencial to keep us going.</p>\
<p>You can also get in touch with us on ' + hrefFacebook + ', '+ hrefGitHub +', or ' + hrefMail + '. \
<p>And for more information you can visit our '+ hrefHomepage +'.</p>\
<p>P.S. Having more positive than negative interactions improves your day-to-day experience. Create some good moments today!</p>\
  </body>\
</html>'
}
