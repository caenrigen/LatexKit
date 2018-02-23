function menuMakeTabular(){
  singleExport({groupSettingsGetter: 'getTabs',defaultUserSettingsArrayGetter:'getTabUserDefault',defaultSettingsArrayGetter: 'getTabDefault',strGenerator: range_to_string});
}

function menuExportAllTabs(){
  var settings = updateSettingsSheet();
  exportGroup(settings.getTabs(),range_to_string);
}

function menuExportData(){
  singleExport({groupSettingsGetter: 'getData',defaultUserSettingsArrayGetter:'getDatumUserDefault',defaultSettingsArrayGetter: 'getDatumDefault',strGenerator: datumToStr});
}
function menuExportAllData(){
  var settings = updateSettingsSheet();
  exportGroup(settings.getData(),datumToStr);
}

function alertExportToFile(str)
{
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert('Export to file?', str, ui.ButtonSet.YES_NO);
  if (response === ui.Button.YES) exportTextToFile(str);
}

function getFullA1Notation(range){
  return range.getSheet().getName()+ '!' + range.getA1Notation();
}

function singleExport(obj){
  var ss = SpreadsheetApp.getActiveSpreadsheet(),
  settingsSh = ss.getSheetByName(getDevSettings().getSettingsSheetName());
  
  var activeRange = ss.getActiveSheet().getActiveRange();
  
  if(settingsSh !== null){
    var settings = updateSettingsSheet();
    if(getGeneralSettingsFromArray(settings.getGeneral()).getUseSettingForSingleExport() === true){
      var activeRangeA1 = getFullA1Notation(activeRange),
          groupSettings = settings[obj.groupSettingsGetter](),
          namedRanges = ss.getNamedRanges(),
          namedRangesLen = namedRanges.length;
      for(var i=0;i<namedRangesLen;i++){
        var range = namedRanges[i].getRange();
        // Check if a named range is active
        if(getFullA1Notation(namedRanges[i].getRange()) === activeRangeA1){
          for(var j=0;j<groupSettings.length;j++){
            // Check if the named range (that is active) has the same name as any in the settings sheet
            if(namedRanges[i].getName() === getSettingsFromArray(groupSettings[j]).getRangeName()){
              var settingsArray = groupSettings[j];
              break;
            }
          }
        }
      }
      if(settingsArray === undefined) settingsArray = settings[obj.defaultUserSettingsArrayGetter]();
    }
  }
  try{ 
    if(settingsArray === undefined){
      alertExportToFile(obj.strGenerator({range: activeRange,
                        settingsArray: getDefaultSettings()[obj.defaultSettingsArrayGetter]()}));
    }else if(settingsArray[0] === "default"){
      alertExportToFile(obj.strGenerator({range: activeRange,
                        settingsArray: settingsArray}));
    }else{
      exportGroup([settingsArray],obj.strGenerator);
    }
  }catch(e){
     // Avoid getting an error in Google Project's Console when the user leaves the alert opened
     e.name==="Exception" ? console.info(e) : function(){throw(e);}();
  }
}
