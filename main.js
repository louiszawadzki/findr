'use strict';

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const ipc = require('ipc');
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
var currentDir = '/home/louis/Bureau';

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

var sendDir = function (directory) {
  fs.readdir(directory, function(err, list) {
    mainWindow.webContents.send('directory', list);
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('init');
    sendDir(currentDir)
  });

  ipc.on('back', () => {
    var rootPosition = currentDir.lastIndexOf("/");
    if (rootPosition > 0) {
      currentDir = currentDir.substring(0, rootPosition);
      sendDir(currentDir);
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
