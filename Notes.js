function TEMPLATE_NOTE(){
  

  var string = 'Produce different styles of table, existing templates are:\n\n'+
                       'Horizon\n'+
                       '           _____\n'+
                       '                \n'+
                       '           _____\n\n'+
                         
                       'Barcode\n'+
                       '               |    |    |\n'+
                       '               |    |    |\n'+
                       '               |    |    |\n\n'+
                       
                       'Grid\n'+
                       '              ______\n'+
                       '              |_|_|_|_|\n'+
                       '              |_|_|_|_|\n'+
                       '              |_|_|_|_|\n\n'+
                       
                       'Manual\n\nManually control your table by adding a column to the right of a Named Range '+
                         'with the explicit commands to use e.g. (\\hline). Note: If you want the command to appear before the first line, you have to insert it on the row above the your range.';
  
  return string;

}

function OPTION_NOTE(){
  
  var string = 
      'Aditional option for each template choosen. Change this value to some integer X to customize the template:\n\n'+
      'Horizon & Barcode: Add an additional horizontal line below row X\n\n'+
      'Grid: Set X to 0 to remove the outer border';
  
  return string;
  
}

function BIGSTRUT_NOTE(){
  
 var string = 'Setting this field to TRUE includes a small space below and above each horizontal line, '+
              'useful when you have exponents or indices in your table, as this tend to overlap with the lines';
  
  
  
  return string;
}