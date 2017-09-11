var getDevSettings = function(){
  return {
    getAppName:           function(){return 'LatexKit'},
    getSettingsSheetName: function(){return 'LatexKitSettings'},
    getErrorColumnTag:    function(){return 'err'},
    getDataColSeparators: function(){return {space:' ',tab:'\t',enter:'\r\n',LF:'\n',CR:'\r'}}
  };
};

var getNotes = function(){
    return {
    getGeneralHeaderNotes: function(){return [
      ['General Settings']
    ];},
    getGeneralDefaultsNotes : function(){return [
      ['Named Ranges that identify ranges to be exported as Latex tabular should end like this.\n\nPossible values:\n.<Any string>\n\nNote: The dot, ".", is imperative!'],
      ['Named Ranges that identify ranges to be exported as Data text files should end like this.\n\nPossible values:\n.<Any string>\n\nNote: The dot, ".", is imperative!'],
      ['When exporting a single tabular or data use the user settings if the selected range matches any of the Named Ranges in the Settings Sheet.\nThis may slow down the export so you can disable it here.\n\nPossible values:\nTRUE - Use user settings when available.\nFALSE - Just export using default settings and prompt for output file path.']
    ];},
    getTabsHeaderNotes : function(){return [
    ['Tabular Settings for each range to be exported as Latex tabular.'],
      [null,
       'UNIX like folder path in your Drive.\n\nValid paths (comarination may be used):\n/ - Drive root\n./ - This spreadsheet folder\n\../ - Parent folder of this spreadsheet folder\n\nNote: new folders are created if do not exist.',
       'Output text file extension.\n\nHint: using \".txt\" makes it possible to open the file directly in the Drive.',
       TEMPLATE_NOTE(),
       OPTION_NOTE(),
       BIGSTRUT_NOTE()
      ]
    ];},
    getTabDefaultNotes : function(){return [
      ['This is the default settings for a tabular.\n\nEach new Named Range will assume this values.']
    ];},
    getDataHeaderNotes : function(){return[
    ['Tabular Settings for each range to be exported as Data text file.'],
      [null,
       'UNIX like folder path in your Drive.\n\nValid paths (comarination may be used):\n/ - Drive root\n./ - This spreadsheet folder\n\../ - Parent folder of this spreadsheet folder\n\nNote: new folders are created if do not exist.',
       'Output text file extension.\n\nHint: using \".txt\" makes it possible to open the file directly in the Drive.',
       'Choose to export with full numbers precision or just the displayed values.\n\nPossible values:\nTRUE\nFALSE.',
       'The character(s) used as data columns separator.\n\nPossible values:\nspace\ntab - a.k.a. \"\\t\"\nenter - a.k.a. "\\r\\n\"\nLF - a.k.a. \"\\n\"\nCR - a.k.a. \"\\r\"\n<Any string>',
       'Optionally swamp or omit columns in the corresponding range.\n\nPossible values:\nFALSE - do nothing\ncX[cY...] - e.g. \"c1c3c1c4\" will only output columns 1,3,1 and 4 in this order. Column counting in the Named Range starts with \'1\'.'
      ]
    ];},
    getDatumDefaultNotes : function(){return [
      ['This is the default settings for a Data.\nEach new Named Range will assume this values.']
    ];}
  };
};

var getDefaultSettings = function(){
  return {
    getGeneralHeader: function(){return [
      ['GENERAL','','Created By: Victor Negîrneac & Daniel Hachmeister']
    ];},
    getGeneralDefaults : function(){return [
      ['Tabular Named Ranges Identifier:','.tab','For latest updates, feature requests and feedback please visit:'],
      ['Data Named Ranges Identifier:','.dat','https://www.facebook.com/latexkit/ and github.com/caenrigen/LatexKit'],
      ['Use Settings Sheet for Single Export:',true]
    ];},
    getTabsHeader : function(){return [
    ['TABS'],
      ['Range Name:','Folder:','Extension:','Template:','Option:','Bigstrut:']
    ];},
    // Note that this default is not an array of arrays
    // This makes it more convenient for most calls
    getTabDefault : function(){return ['default','./tabs','.tex',false,false,false];},
    getDataHeader : function(){return[
    ['DATA'],
      ['Range Name:','Folder:','Extension:','Full Precision:','Separator:','Column Swap:']
    ];},
    // Note that this default is not an array of arrays
    // This makes it more convenient for most calls
    getDatumDefault : function(){return ['default','./data','.txt',true,'tab',false];}
  };
};

// Constructors for getting settings from an array
// Every constructor returns an object containing the functions that return a specific element from the array
var getGeneralSettingsFromArray = function (genSettings){
  return {
    getTabsIdentifier: function(){return genSettings[0][1];},
    getDataIdentifier: function(){return genSettings[1][1];},
    getUseSettingForSingleExport: function(){return genSettings[2][1];}
  }
};
var getTabSettingsFromArray = function (tabSettings){
  return {
    getRangeName:  function(){return tabSettings[0];},
    getFolderPath: function(){return tabSettings[1];},
    getExtention:  function(){return tabSettings[2];},
    getTemplate:   function(){return tabSettings[3];},
    getOptions:    function(){return tabSettings[4];},
    getBigstrut:   function(){return tabSettings[5];},
//    getSColumns:   function(){return tabSettings[6];}
  };
};
var getDatumSettingsFromArray = function (datumSettings){
  return {
    getRangeName:     function(){return datumSettings[0];},
    getFolderPath:    function(){return datumSettings[1];},
    getExtention:     function(){return tabSettings[2];},
    getFullPrecision: function(){return datumSettings[3];},
    getSep:           function(){return datumSettings[4];},
    getColumnSwap:    function(){return datumSettings[5];}
  };
};
var getSettingsFromArray = function (array){
  return {
    getRangeName:     function(){return array[0];},
    getFolderPath:    function(){return array[1];},
    getExtention:     function(){return array[2];}
  };
};

//  ===========================================================================
function createSettingsSheet(){
  var sh = SpreadsheetApp.getActiveSpreadsheet().insertSheet(getDevSettings().getSettingsSheetName());
  var defSettings = getDefaultSettings();
//  Join all default settings arrays
  var settings = [].concat(defSettings.getGeneralHeader(),
                           defSettings.getGeneralDefaults(),
                           defSettings.getTabsHeader(),
                           [defSettings.getTabDefault()],
                           defSettings.getDataHeader(),
                           [defSettings.getDatumDefault()]
                          ).rectangulateMatrix('');
//  Copy to SettingsSheet
  sh.getRange(1,1,settings.length,settings[0].length).setValues(settings);
  sh.autoResizeColumn(1).getRange('C1:F3').mergeAcross();
  return sh;
}

function getSettingsFromSheet(settingsSh){
//  Get setting from settings sheet
  var values = settingsSh.getDataRange().getValues();
  var defSettings = getDefaultSettings();
  var generalSettings = [];
  var tabsSettings = [];
  var dataSettings = [];
//  Fill each setting group
//  Stop when finding a separator or the range ends
  for(var i=1;i<values.length && values[i][0] !== defSettings.getTabsHeader()[0][0];i++){
    generalSettings.push(values[i]);
  };
  var tabUserDefaultSettings = values[i+2];
  for(i+=3;i<values.length && values[i][0] !== defSettings.getDataHeader()[0][0];i++){
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
  var tabs = settings.getTabs();
  var data = settings.getData();
  var tabDef = settings.getTabUserDefault();
  var datumDef = settings.getDatumUserDefault();
  
  var generalSettings = getGeneralSettingsFromArray(general);
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
  var output = [].concat(defSettings.getGeneralHeader(),
                         general,
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
    var newNotes = [].concat(notes.getGeneralHeaderNotes(),
                          notes.getGeneralDefaultsNotes(),
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
//  Retunr in the same fashion as getSettingsFromSheet()
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
  var settingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(getDevSettings().getSettingsSheetName());
  if(settingsSheet === null){
    var ui = SpreadsheetApp.getUi();
    var response = ui.alert('Settings sheet was not found! Would you like to create it?', ui.ButtonSet.YES_NO);
    if (response === ui.Button.YES){
      updateSettingsSheet();  // Create and update setting sheet
      menuShowSettingsSheet();  // Run this function again in order to activate the sheet
    }
  }
  else{
    settingsSheet.activate();
  };
}