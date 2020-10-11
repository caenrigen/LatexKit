function create_tableFeats(spec) {

  var range = spec.range;
  var values = range.getDisplayValues();
  var numColumns = range.getNumColumns();


  //***************** COLUMN FEATURES ARRAY CREATION *****************

  // Array of ColFeat structures that saves the characteristics of each column
  var colFeats = [];

  for(var k=0;k<numColumns;k++)
    colFeats[k] = colFeat();

  // Start at top right corner and go throughout the matrix
  // Stop when finding an "err" keyword
  for(k=1;k<numColumns;k++)
    for(var i=0;i<values.length;i++)
    {
      if(values[i][k] === getDevSettings().getErrorColumnTag())
      {
        colFeats[k - 1].set_pmError();
        break;
      }
      if(values[i][k] === 'sd')
      {
        colFeats[k - 1].set_sdError();
      }
    }

  // *************** END OF COLUMNS FEATURES CREATION *****************

  // ***************** ROW FEATURES ARRAY CREATION ********************

  // Local var for the range's values
  var numRows = range.getNumRows();

  // Array of rawFeat structures that saves the characteristics of each column
  var rowFeats = [];

  for(var k=0;k<=numRows;k++)
    rowFeats[k] = rowFeat();

  // ************** END OF ROW FEATURES CREATION **********************

  var settingsArray = spec.settingsArray;
  var sets = getTabSettingsFromArray(settingsArray);
  var rangeName = sets.getRangeName();

  //***************** TABLE TYPE FEATURES  ****************************

  var tableType = sets.getTableType();

  // *************** END OF TABLE TYPE FEATURES ***********************

  //***************** TABLE CAPTION FEATURES  *************************
  var tableCaption = sets.getCaption();
  if (tableCaption === "default"){
    tableCaption = range.getSheet().getName();
  };

  var rageNameSplit = rangeName.split(".");
  var tableLabel = undefined;
  if (rageNameSplit[rageNameSplit.length - 1] !== "" && rageNameSplit.length > 1){
    tableLabel = rageNameSplit[0];
  } else {
    tableLabel = tableLabel;
  };
  var tablePlacementSpecifier = sets.getPlacementSpecifier();
  // *************** END OF TABLE CAPTION FEATURES ********************

  // ***************** TEMPLATE CONFIGURATION *************************
  var options = sets.getOptions();
  var template = sets.getTemplate();

  if(!template)
    return {
      rowFeats: rowFeats,
      colFeats: colFeats,
      tableType: tableType,
      tableCaption: tableCaption,
      tableLabel: tableLabel,
      tablePlacementSpecifier: tablePlacementSpecifier,
    };

  if(options !== false && typeof options != 'number')
  {
    SpreadsheetApp.getUi().alert(
      'Warning:\nField \'Options\' is invalid for NamedRange \'' + rangeName + '\'');

    return {
      rowFeats: rowFeats,
      colFeats: colFeats,
      tableType: tableType,
      tableCaption: tableCaption,
      tableLabel: tableLabel,
      tablePlacementSpecifier: tablePlacementSpecifier,
    };
  }

  template=template.toLowerCase();
  // ********* HORIZON TEMPLATE *************
  if(template === 'horizon' ){

    rowFeats[0].set_hline();
    rowFeats[numRows].set_hline();

    if(options !== false  && options < numRows && options > 0)
       rowFeats[options].set_hline();

    if(sets.getBigstrut() === true)
      set_bigstrut(rowFeats);

    return {
      rowFeats: rowFeats,
      colFeats: colFeats,
      tableType: tableType,
      tableCaption: tableCaption,
      tableLabel: tableLabel,
      tablePlacementSpecifier: tablePlacementSpecifier,
    };
  }
  // ********** END OF HORIZON ***************

  // ********** BARCODE TEMPLATE *************
  if(template === 'barcode'){

    colFeats[0].set_lbar();
    for(k=0; k<numColumns; k++)
      colFeats[k].set_rbar();

    if(options === 1){
      colFeats[colFeats.length - 1].reset_rbar();
      colFeats[0].reset_lbar();
    };

    if(sets.getBigstrut() === true)
      set_bigstrut(rowFeats);

    return {
      rowFeats: rowFeats,
      colFeats: colFeats,
      tableType: tableType,
      tableCaption: tableCaption,
      tableLabel: tableLabel,
      tablePlacementSpecifier: tablePlacementSpecifier,
    };
  }
  // ******** END OF BARCODE ******************

  // ********* GRID TEMPLATE ******************
  if(template === 'grid'){

    if(options === 0){

      for(k=1 ; k<numColumns ; k++)
        colFeats[k].set_lbar();

      for(k=1 ; k<numRows ; k++)
        rowFeats[k].set_hline();
    }

    else if(options !== 0){

      colFeats[0].set_lbar();
      for(k=0 ; k<numColumns ; k++)
        colFeats[k].set_rbar();

      rowFeats[0].set_hline();
      for(k=1 ; k<=numRows ; k++)
        rowFeats[k].set_hline();
    }

      if(sets.getBigstrut() === true)
        set_bigstrut(rowFeats);

    return {
      rowFeats: rowFeats,
      colFeats: colFeats,
      tableType: tableType,
      tableCaption: tableCaption,
      tableLabel: tableLabel,
      tablePlacementSpecifier: tablePlacementSpecifier,
    };
  }

  // ********* MANUAL TEMPLATE ******************
  if(template === 'manual'){
    var manualColSpec = '';
    try{
      manualColSpec = range.offset(-1, 0).getDisplayValue();
    } catch(e){
      // In case the table is at the top and there is no cell above
      manualColSpec = '';
    }
    return {
      manual: true,
      rowFeats: rowFeats,
      colFeats: colFeats,
      tableType: tableType,
      tableCaption: tableCaption,
      tableLabel: tableLabel,
      tablePlacementSpecifier: tablePlacementSpecifier,
      manualColSpec: manualColSpec,
    };
  }
  // ********* MANUAL TEMPLATE ******************

  // If the code reached this point no template matches were found, warn the user
  SpreadsheetApp.getUi().alert('Warning:\nInvalid Template for NamedRange '+sets.getRangeName());
  return {
    rowFeats: rowFeats,
    colFeats: colFeats,
    tableType: tableType,
    tableCaption: tableCaption,
    tableLabel: tableLabel,
    tablePlacementSpecifier: tablePlacementSpecifier,
  };
}

// Auxiliar function to configure bigstruts if need be
function set_bigstrut(rowFeats){

  if(rowFeats[0].get_hline())
    rowFeats[1].set_bigstrutTop();

  for(var k=1; k < (rowFeats.length - 1) ; k++)
    if(rowFeats[k].get_hline()){
      rowFeats[k].set_bigstrutBot();
      rowFeats[k+1].set_bigstrutTop();
    }

  if(rowFeats[k].get_hline())
    rowFeats[k].set_bigstrutBot();

}
