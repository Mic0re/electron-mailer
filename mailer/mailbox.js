const Imap = require('imap');
const simpleParser = require('mailparser').simpleParser;

function getMails(myMail, myPwd) {
	myMail = 'nunuhi721@gmail.com'; 
	myPwd = 'Parolneotgadat123123';
	console.log(myMail, myPwd);
	// resulting array
	const mailbox = []; 
	const mailboxPromise = new Promise((resolve, reject) => {
		let getEmailFromInbox = (imap) => {
			imap.openBox('INBOX', false, (err) => {
				if (err) reject('Fetch error: ' + err);
				
				let f = imap.seq.fetch('1:*', {
					bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
					struct: true
				});
				
				f.on('message', (msg) => {
					msg.on('body', (stream) => {
						let buffer = '';
						
						stream.on('data', (chunk) => {
							buffer += chunk.toString('utf8');
						});

						stream.once('end', async () => {							
							await simpleParser(buffer)
								.then(parsed => mailbox.push(parsed));
						});
					});
				});

				f.once('error', (err) => {
					reject('Fetch error: ' + err);
				});

				f.once('end', () => {
					resolve(mailbox);
					console.log(mailbox);
					imap.end();
					console.log('Done fetching all messages!');
				});
			});
		};

		let imap = new Imap({
			user: myMail,
			password: myPwd,
			host: 'imap.gmail.com',
			port: 993,
			tls: true,
			tlsOptions: {
				rejectUnauthorized: false,
			},
			authTimeout: 5000
		}).once('error', (err) => {
			reject(err);
		});
		imap.once('ready', () => {
			imap.openBox('INBOX', true, (err) => {
				if (err) reject(err);
				console.log('message', 'server1 ready');
			});
			getEmailFromInbox(imap);			
		});

		imap.connect();
	});
	return mailboxPromise;
}

module.exports = getMails;

