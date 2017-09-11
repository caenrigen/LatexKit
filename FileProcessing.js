function getFolderInFolder(parentFolder,childFolderName){
//  Gets a folder inside a folder
//  Creates the folder if it does not exit
var childFolder = parentFolder.getFoldersByName(childFolderName);
if(childFolder.hasNext()){
    childFolder = childFolder.next();
} else childFolder = parentFolder.createFolder(childFolderName);
return childFolder;
}

function getFolder(pathStr){
//  Gets a folder object from Drive specified by 'pathStr' in UNIX style
var foldersNames = pathStr.split('/');
var i=0;
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
//  If '/' is the first char in 'pathStr' get root folder
else if(foldersNames[0] === '' && pathStr !== ''){ // and exclude empty 'pathStr'
    var folder = DriveApp.getRootFolder();
}else throw 'Can not parse folder path: "'+pathStr+'".';
//  Go through any other folders (creates them if they do not exist)
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

function exportTextToFile(text){
//  Creating file with "text" with filename from user input using saveDataToFile(...)
var ui = SpreadsheetApp.getUi();
var response = ui.prompt("Enter output filepath (including file's name and extension):",
    'e.g. \"./MyFolder/MyTable.tex\"\nWARNING: This will overwrite any existing file with the same name and on the same folder!\nNew folders will be created if non exist.',
    ui.ButtonSet.OK_CANCEL);
if (response.getSelectedButton() == ui.Button.OK) {
    var responseText = response.getResponseText();
    var aux = responseText.split('/');
    var fileNameLen = aux[aux.length-1].length;
    // Check for empty fileName. There may be some other invalid fileNames on Drive or suitable for sync
    if (fileNameLen === 0) ui.alert('File name not valid! Check your typing and try again.');
    var fileName = responseText.slice(-fileNameLen);
    var folderPath = responseText.slice(0,responseText.length - fileNameLen);
    try{
        var folder = getFolder(folderPath);
    } catch(e){
        ui.alert(e+' Check your typing and try again.');
        return;
    };
    try{
        saveDataToFile(folder,fileName,text);
    } catch(e){
        ui.alert('There was a problem savind your file: '+e);
    };
};
}