'use strict';

var ipc = require('electron').ipcRenderer;

ipc.on('directory', function(e, dir) {
  var directory = document.getElementById('directory');
  dir.forEach(function(element) {
    var row = document.createElement('tr');
    row.innerHTML = element;
    directory.appendChild(row);
  })
});
