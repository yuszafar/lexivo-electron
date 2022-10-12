const { app, Tray, Menu, BrowserWindow } = require('electron');
const icon = 'src/images/Favicon.png';
let tray;

function createWindow () {

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    icon: icon,
  });

  mainWindow.loadFile('./src/index.html');

}

app.whenReady().then(() => {

  createWindow ()

  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])

  tray.setToolTip('LEXIVO')
  tray.setContextMenu(contextMenu)
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
