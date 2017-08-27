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
  if (response === ui.Button.YES) createTextFile(str);
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
  
  if(settingsArray === undefined){
    alertExportToFile(obj.strGenerator({range: activeRange,
                      settingsArray: getDefaultSettings()[obj.defaultSettingsArrayGetter]()}));
  }else if(settingsArray[0] === "default"){
    alertExportToFile(obj.strGenerator({range: activeRange,
                      settingsArray: settingsArray}));
  }else{
    exportGroup([settingsArray],obj.strGenerator);
  }
}
//function menuMakeTabular(){
//  var ss = SpreadsheetApp.getActiveSpreadsheet(),
//      settingsSh = ss.getSheetByName(getDevSettings().getSettingsSheetName());
//  
//  var activeRange = ss.getActiveSheet().getActiveRange();
//  
//  if(settingsSh !== null){
//    var settings = updateSettingsSheet();
//    if(getGeneralSettingsFromArray(settings.getGeneral()).getUseSettingForSingleExport() === true){
//      var settingsArray = getUserSettingsForActiveRange({activeRange: activeRange,
//                                                         groupSettings: settings.getTabs(),
//                                                         namedRanges: ss.getNamedRanges()}
//                                                       );
//    }
//  }
//  
//  if(settingsArray === undefined){
//    alertExportToFile(range_to_string({range: activeRange,
//                                       settingsArray: getDefaultSettings().getTabDefault()}));
//  }else{
//    exportGroup([settingsArray],function(range,settingsArray){return range_to_string({range: range, settingsArray: settingsArray});});
//  }
//}

//
//function getUserSettingsForActiveRange(obj){
//  //  obj = {activeRange: ...,
//  //         groupSettings: ...,
//  //         namedRanges: ...
//  //        }
//  var activeRange = obj.activeRange,
//      activeRangeA1 = getFullA1Notation(activeRange),
//      groupSettings = obj.groupSettings,
//      namedRanges = obj.namedRanges,
//      namedRangesLen = namedRanges.length;
//  for(var i=0;i<namedRangesLen;i++){
//    var range = namedRanges[i].getRange();
//    // Check if a named range is active
//    if(getFullA1Notation(namedRanges[i].getRange()) === activeRangeA1){
//      for(var j=0;j<groupSettings.length;j++){
//        // Check if the named range (that is active) has the same name as any in the settings sheet
//        if(namedRanges[i].getName() === getSettingsFromArray(groupSettings[j]).getRangeName()){
//          return groupSettings[j];
//        }
//      }
//    }
//  }
//}

//function menuExportData(){
//  var ss = SpreadsheetApp.getActiveSpreadsheet(),
//      settingsSh = ss.getSheetByName(getDevSettings().getSettingsSheetName());
//  
//  var activeRange = ss.getActiveSheet().getActiveRange();
//  
//  if(settingsSh !== null){
//    var settings = updateSettingsSheet();
//    if(getGeneralSettingsFromArray(settings.getGeneral()).getUseSettingForSingleExport() === true){
//      var settingsArray = getUserSettingsForActiveRange({activeRange: activeRange,
//                                                         groupSettings: settings.getData(),
//                                                         namedRanges: ss.getNamedRanges()}
//                                                       );
//    }
//  }
//  
//  if(settingsArray === undefined){
//    alertExportToFile(datumToStr(activeRange,
//                       getDefaultSettings().getDatumDefault()));
//  }else{
//    exportGroup([settingsArray],datumToStr);
//  }
//  
////  var str = datumToStr(SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveRange(),
////                       getDefaultSettings().getDatumDefault());
////  alertExportToFile(str);
//}

//// Deprecated version
//function menuMakeTabular_old() {
//  var range = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveRange();
////  var ui = SpreadsheetApp.getUi();
//  var outputStr = '';
//  var gotErr = errorFound(range);
//  if(gotErr['Flag']){
//    outputStr = makeErrTabular(range,gotErr['isErrCol'],false);
//  }else outputStr = makeTabular(range,false);
////  var response = ui.alert('Export to file?', outputStr, ui.ButtonSet.YES_NO);
////  if (response === ui.Button.YES) createTextFile(outputStr);
//  alertExportToFile(outputStr);
//}