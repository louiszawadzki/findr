'use strict';

var ipc = require('electron').ipcRenderer;

ipc.on('directory', function(e, dir) {
  console.log(dir);
});
