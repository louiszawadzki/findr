'use strict';

var ipc = require('electron').ipcRenderer;

ipc.on('init', function () {
  document.getElementById('back').onclick = function () {
    ipc.send('back');
  };
});

ipc.on('directory', function(e, dir) {
  var directory = document.getElementById('directory');
  directory.innerHTML = "";
  dir.forEach(function(element) {
    var row = document.createElement('tr');
    row.innerHTML = element;
    directory.appendChild(row);
  });
});
