function createSettingsSheet(){
  var sh = SpreadsheetApp.getActiveSpreadsheet().insertSheet(getDevSettings().getSettingsSheetName());
  var defSettings = getDefaultSettings();
//  Join all default settings arrays
  var settings = [].concat(defSettings.getGeneralDefaults(),
                           defSettings.getTabsHeader(),
                           [defSettings.getTabDefault()],
                           defSettings.getDataHeader(),
                           [defSettings.getDatumDefault()]
                          ).rectangulateMatrix('');
//  Copy to SettingsSheet
  sh.getRange(1,1,settings.length,settings[0].length).setValues(settings);
  sh.autoResizeColumn(1).getRange('C1:F4').mergeAcross();
  return sh;
}

function getSettingsFromSheet(settingsSh){
//  Get setting from settings sheet
  var values = settingsSh.getDataRange().getValues();
  var defSettings = getDefaultSettings();
  var tabsSep = defSettings.getTabsHeader()[0][0];
  var dataSep = defSettings.getDataHeader()[0][0];
  var generalSettings = [];
  var tabsSettings = [];
  var dataSettings = [];
//  Fill each setting group
//  Stop when finding a separator or the range ends
  for(var i=0;i<values.length && values[i][0] !== tabsSep;i++){
    generalSettings.push(values[i]);
  };
  var tabUserDefaultSettings = values[i+2];
  for(i+=3;i<values.length && values[i][0] !== dataSep;i++){
    tabsSettings.push(values[i]);
  };
  var datumUserDefaultSettings = values[i+2];
  for(i+=3;i<values.length && values[i][0];i++){
    dataSettings.push(values[i]);
  };
  return {getGeneral:          function(){return generalSettings;},
          getTabUserDefault:   function(){return tabUserDefaultSettings;},
          getTabs:             function(){return tabsSettings;},
          getDatumUserDefault: function(){return datumUserDefaultSettings;},
          getData:             function(){return dataSettings;}
         };
}

function menuUpdatesettingSheet(){
  addGAMenuClick({
    el: 'menuUpdatesettingSheet',
  });
  try{
    initGA();
    updateSettingsSheet();
  }
  catch(error) {
    myPrint(error);
  }
}

function updateSettingsSheet(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
//  var ss = SpreadsheetApp.openById('1e-84AImIzUWAZWGL0p98rZHv9OLHcbMXukMgLnGZCuA');
  var settingsSh = ss.getSheetByName(getDevSettings().getSettingsSheetName());
//  Create setting sheet if non existing
  if(settingsSh === null) {
    settingsSh = createSettingsSheet();
    };
  var settings = getSettingsFromSheet(settingsSh);
  var general = settings.getGeneral();
  var generalSettings = getGeneralSettingsFromArray(general);
// Version check
  if (generalSettings.getVersion() !== getDevSettings().getAppVersion()){
    var settingsShName = settingsSh.getName(),
        oldName;
    for(var i=1, oldName = settingsShName +'_old'+i;
        ss.getSheetByName(oldName) !== null;
        i++,oldName = settingsShName+'_old'+i){};
    settingsSh.setName(oldName);
    settingsSh = createSettingsSheet();
    // Reset vars from new settings sheet
    var settings = getSettingsFromSheet(settingsSh);
    var general = settings.getGeneral();
    var generalSettings = getGeneralSettingsFromArray(general);
    // Ask to remove old one
    var ui = SpreadsheetApp.getUi();
    ui.alert('Version check error', 'The exiting settings sheet seemed outdated or incomplete. \
It was renamed and a new one created. You may want to copy-paste some of your table settings.', ui.ButtonSet.OK);
  }

  var tabs = settings.getTabs();
  var data = settings.getData();
  var tabDef = settings.getTabUserDefault();
  var datumDef = settings.getDatumUserDefault();

// Get named ranges' names
  var tabsNamedRangesNames = getNamedRangesNames(ss,generalSettings.getTabsIdentifier());
  var dataNamedRangesNames = getNamedRangesNames(ss,generalSettings.getDataIdentifier());
//  Check if no named ranges
  if(tabsNamedRangesNames.legth == 0 && dataNamedRangesNames.lengh == 0){
    var ui = SpreadsheetApp.getUi();
    ui.alert('No Named Ranges ending in "'+ generalSettings.getTabsIdentifier() +'" or "'+ generalSettings.getDataIdentifier() + '" where found! Please name a range first.');
    return;
  }
  updateSettingsGroup(tabDef,tabs,tabsNamedRangesNames);
  updateSettingsGroup(datumDef,data,dataNamedRangesNames);
//  Sort items in each settings group
  tabs = tabs.sort(itemsCompare);
  data = data.sort(itemsCompare);
//  Create output values
  var defSettings = getDefaultSettings();
  var output = [].concat(general,
                         defSettings.getTabsHeader(),
                         [tabDef],
                         tabs,
                         defSettings.getDataHeader(),
                         [datumDef],
                         data
                        ).rectangulateMatrix('');
  var outputRowNum = output.length;
  var outputColNum = output[0].length;
//  Find the positions in output to put the notes
  for(var i=0;i<outputRowNum;i++){
    if(output[i][0] === getDefaultSettings().getTabsHeader()[0][0]){
      var tabsHeaderPos = i;
    }else if(output[i][0] === getDefaultSettings().getDataHeader()[0][0]){
      var dataHeaderPos = i;
    }
  }
  if(tabsHeaderPos !== undefined && dataHeaderPos !== undefined){//  Just a precaution
    var notes = getNotes();
//    Create blank matrixes to be concatenated later with notes
    var tabsBlankNotes = [].matrix(dataHeaderPos
                                   -tabsHeaderPos
                                   -notes.getTabsHeaderNotes().length
                                   -notes.getTabDefaultNotes().length,1,null);
    var dataBlankNotes = [].matrix(outputRowNum-1
                                   -dataHeaderPos
                                   -notes.getDataHeaderNotes().length
                                   -notes.getDatumDefaultNotes().length,1,null);
//    Create notes and make a rectangular matrix
    var newNotes = [].concat(notes.getGeneralDefaultsNotes(),
                          notes.getTabsHeaderNotes(),
                          notes.getTabDefaultNotes(),
                          tabsBlankNotes,
                          notes.getDataHeaderNotes(),
                          notes.getDatumDefaultNotes(),
                          dataBlankNotes
                         ).rectangulateMatrix(null);
    settingsSh.getRange(1, 1,newNotes.length ,newNotes[0].length).setNotes(newNotes);
  }
//  setValues back to the settings sheet
  settingsSh.getDataRange().clearContent();
  settingsSh.getRange(1, 1,outputRowNum ,outputColNum).setValues(output);
//  Return in the same fashion as getSettingsFromSheet()
  return {getGeneral:          function(){return general;},
          getTabUserDefault:   function(){return tabDef;},
          getTabs:             function(){return tabs;},
          getDatumUserDefault: function(){return datumDef;},
          getData:             function(){return data;}
         };
}

function itemsCompare(row1, row2){
  if (row1[0] < row2[0]){
    return -1;
  } else if (row1[0] > row2[0]){
    return 1;
  }
  return 0;
}

function updateSettingsGroup(defaultItemSettings,settingsGroup,itemsNames){
//  defaultItemSettings - default settings to use when adding new item
//  settingsGroup - tabular or data settings including default as first element
//  itemNames - current items' names from named ranges for a specific settings group, e.g. tabs or data
//  No return is used because changes are made in place, i.e. settingsGroup is changed

//  Create auxiliary array containing only settingsGroup's names
  var settingsGroupItemsNames = [];
  for(var k=0;k<settingsGroup.length;k++){
    settingsGroupItemsNames.push(settingsGroup[k][0]);
  }
//  Remove old items from settingsGroup, note that settingsGroup.length changes during removes therefore decreasing counting is used
  for(var k=settingsGroup.length;k>-1;k--){
    if(itemsNames.indexOf(settingsGroupItemsNames[k]) === -1) settingsGroup.splice(k, 1);
  }
//  Add new items to settingsGroup using user's default values
  for(var k=0;k<itemsNames.length;k++){
    if (settingsGroupItemsNames.indexOf(itemsNames[k]) === -1) settingsGroup.push([itemsNames[k]].concat(defaultItemSettings.slice(1)));
  }
}

function getNamedRangesNames(spreadSheet,extension){
//  Gets an array of the named ranges' names that end in 'extension'
  var namedRanges = spreadSheet.getNamedRanges();
  var fileNames = [];
  var sliceExtensionPos = -extension.length;
  for(var i=0;i<namedRanges.length;i++){
    if (namedRanges[i].getName().slice(sliceExtensionPos) === extension) fileNames.push(namedRanges[i].getName());
  }
  return fileNames;
}

function exportGroup(groupSettings, strGenerator){
  //  groupSettings: array of tabulars or data settings
  //  strGenerator(range, groupSettings[i]): function that will create a string based on each item settings
  var str='';
//  Not using getRangeByName() here because it's faster this way
  var namedRanges = SpreadsheetApp.getActiveSpreadsheet().getNamedRanges();
  var settings = {};
  for(var i=0; i<groupSettings.length;i++)
  {
    for(var j=0; j<namedRanges.length;j++)
    {
      settings = getSettingsFromArray(groupSettings[i]);
      if(namedRanges[j].getName() === settings.getRangeName()){
        str = strGenerator({range: namedRanges[j].getRange(),
                            settingsArray: groupSettings[i]});
        saveDataToFile(getFolder(settings.getFolderPath()), settings.getRangeName().split('.')[0]+settings.getExtention(),str);
      };
    };
  };
}

function menuShowSettingsSheet(){
  addGAMenuClick({
    el: 'menuShowSettingsSheet',
  });
  try{
    initGA();
    var settingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(getDevSettings().getSettingsSheetName());
    if(settingsSheet === null){
      var ui = SpreadsheetApp.getUi();
      var response = ui.alert('Settings sheet was not found! Would you like to create it?','Tips:\nThere are notes in the settings \
  sheet that explain how to use it. Hold the mouse over the cells that have a black triangle in the corner to see them!\nThe default values change the behaviour of the menu for \"Make Tabular\" and \"Export Data\"!', ui.ButtonSet.YES_NO);
      if (response === ui.Button.YES){
        updateSettingsSheet();  // Create and update setting sheet
        menuShowSettingsSheet();  // Run this function again in order to activate the sheet
      }
    }
    else{
      settingsSheet.activate();
    };
  }
  catch(error) {
    myPrint(error);
  }
}
