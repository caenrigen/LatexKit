function getFolderInFolder(parentFolder,childFolderName){
//  Gets a folder inside a folder
//  Creates the folder if does not exit
  var childFolder = parentFolder.getFoldersByName(childFolderName);
  if(childFolder.hasNext()){
    childFolder = childFolder.next();
  } else childFolder = parentFolder.createFolder(childFolderName);
  return childFolder;
}

function getFolder(path){
//  Gets a folder object from Drive specified by path in UNIX style
  var foldersNames = path.split('/');
  var i=0;
//  Check if there is at list one '/'
  if(foldersNames.length < 2) return -1;
//  Spreadsheet file folder
  if(foldersNames[0] === '.'){
   var folder = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId()).getParents().next();
   i++;
  }
//  Go to parent folder as many times as needed
  else if(foldersNames[0]==='..'){
    folder = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId()).getParents().next();
    for(; foldersNames[i] === '..';i++){
      var folder = folder.getParents().next();
    };
  }
//  If '/' is the first char in 'path' get root folder
  else if(foldersNames[0] === ''){
    var folder = DriveApp.getRootFolder();
  }else return -1;
//  Go through any other folders
  for(;i<foldersNames.length && foldersNames[i] !== '';i++){
    folder = getFolderInFolder(folder,foldersNames[i]);
  };
  return folder;
}

function saveDataToFile(folder, fileName, contents){
//  Saves data to file 'fileName' in the folder 'folder'
//  'folder' is an object folder from Drive
//  If the file already exists overwrites it's contents 
  
  var existingFile = folder.getFilesByName(fileName);
  if (existingFile.hasNext()){
    existingFile = existingFile.next();// Here may be usefull to check first if there are files with the same name
    existingFile.setContent(contents);
  }
  else existingFile = folder.createFile(fileName, contents);
}

function createTextFile(text){
//  Creating file with "text" with filename from user input using saveDataToFile
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('Enter output filepath (including filename and extension):',
                           'e.g. \"./MyFolder/MyTable.tex\"\n This will overwrite any existing file with the same name and on the same folder!\nNew folders will be created if non exist.',
                           ui.ButtonSet.OK_CANCEL);
  if (response.getSelectedButton() == ui.Button.OK) {
    var responseText = response.getResponseText();
    var aux = responseText.split('/');
    if(aux.length === 1 && responseText !== ''){
      saveDataToFile(getFolder('./'), response.getResponseText(), text); 
    }
    else if(aux[aux.length-1] !== ''){
//      If filename is not empty then create it in the specified path
        var filenameLen = aux[aux.length-1].length;
        var filename = responseText.slice(-filenameLen);
        var folderPath = responseText.slice(0,responseText.length - filenameLen);
        saveDataToFile(getFolder(folderPath),filename,text);
    }
    else ui.alert('File name not valid! Check your typing and try again.');
  };
}