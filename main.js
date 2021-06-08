const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const getMails = require('./mailer/mailbox');
const sendMail = require('./mailer/sendMail');

let win;

async function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false, // is default value after Electron v5
			contextIsolation: true, // protect against prototype pollution
			enableRemoteModule: false, // turn off remote
			preload: path.join(__dirname, 'preload.js'), // use a preload script
		}
	});
	// Load app
	win.loadFile(path.join(__dirname, 'index.html'));
	// Open the DevTools.
	// win.webContents.openDevTools();
}

app.on('ready', createWindow);

ipcMain.on('getPost', async (event, args) => {
	const mailList = await getMails(args.email, args.password)
		.catch(err => win.webContents.send('receiveError', err.message));
	win.webContents.send('receivePost', mailList);
});

ipcMain.on('sendPost', async (event, args) => {
	const mailList = await sendMail(args.email, args.password, args.to, args.subj, args.text)
		.catch(err => win.webContents.send('receiveError', err));
	win.webContents.send('sendPostRes', mailList);
});
ipcMain.on('lesssecure', async () => {
	console.log('open');
	shell.openExternal('https://myaccount.google.com/lesssecureapps');
	shell.openItem('http://example.com');
});
ipcMain.on('imap', async () => {
	shell.openExternal('https://mail.google.com/mail/u/0/#settings/fwdandpop');
});