const Imap = require('imap');

const getMails = (email, password) => new Promise((resolve, reject) => {
	const mails = [];
	const imap = new Imap({
		user: email,
		password: password,
		host: 'imap.gmail.com',
		port: 993,
		tlsOptions: {
			rejectUnauthorized: false,
		},
		tls: true
		//,debug: function(msg){console.log('imap:', msg);}
	});
	imap.once('ready', function () {
		imap.openBox('INBOX', true, function (err, box) {
			if (err) reject(err);
			const f = imap.seq.fetch('1:*', {
				bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
				struct: true
			});
			f.on('message', function (msg, seqno) {
				msg.on('body', function (stream, info) {
					let buffer = '';
					stream.on('data', function (chunk) {
						buffer += chunk.toString('utf8');
					});
					stream.once('end', function () {
						mails.push(Imap.parseHeader(buffer));
					});
				});
				
				msg.once('end', function () {					
				});
			});
			f.once('error', function (err) {
				reject(err);
			});
			f.once('end', function () {
				resolve(mails);
				imap.end();
			});
		});
	});

	imap.once('error', function (err) {
		reject(err);
	});

	imap.once('end', function () {
		console.log('Connection ended');
	});

	imap.connect();
});

module.exports = getMails;