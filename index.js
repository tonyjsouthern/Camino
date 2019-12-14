// Module Imports
const {app,BrowserWindow,ipcMain,remote} = require('electron')
const { autoUpdater } = require('electron-updater');
var handlers        = require('./routelist.js');
var dns             = require('dns').promises;
var path            = require('path');
var Connection      = require('tedious').Connection;
var sql             = require('sequelize');
var axios           = require('axios');
const mssql = require('mssql')

// Delcare Global Window Variable
let win

// Create the browser window
function createWindow () {
  win = new BrowserWindow({webPreferences: {nodeIntegration: true},  width: 1730, height: 900, frame: false})
  win.loadFile('./render/index.html')
  win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })
}

// List for the app to be ready and check for updates
app.on('ready', function() {
  createWindow()
  autoUpdater.checkForUpdates();
});

// Middleware for passing in global variables
var scope = {
  axios: axios,
  sql: sql,
  mssql: mssql,
  errorHandler: function (message){
    return errors = {
      type: "Error",
      message: message
    }
  }
}
// ROUTES
ipcMain.on('auth-getdbs', async (event, arg) => {
    var results = await handlers.getDbs(event, arg, scope);
    event.sender.send('auth-getdbs-reply', results)
})

ipcMain.on('run-query', async (event, arg) => {
  var results = await handlers.runQuery(event, arg, scope);
  event.sender.send('run-query-reply', JSON.stringify(results))
})

ipcMain.on('minimize-window', event =>{
  console.log("running")
  event.preventDefault();
  win.minimize();
})

ipcMain.on('maximize-window', event =>{
  event.preventDefault();
  win.maximize();
})

ipcMain.on('un-maximize-window', event =>{
  event.preventDefault();
  win.unmaximize();
})

ipcMain.on('close-window', event =>{
  event.preventDefault();
  app.quit()
})

// Trigger update ready message
autoUpdater.on('update-downloaded', (info) => {
    win.webContents.send('updateReady')
});

// Quit the application and install the update
ipcMain.on("quitAndInstall", (event, arg) => {
    autoUpdater.quitAndInstall();
})
