const sendPost = (e) => {
	e.preventDefault();
	// delete previous results and forms
	document.getElementById('mailTable') === null ? null : document.getElementById('mailTable').remove();
	document.getElementById('sendForm') === null ? null : document.getElementById('sendForm').remove();
		
	// generating sender form -----------------------------------------------
	const form = document.createElement('form');
	form.id = 'sendForm';
	form.className = 'input-group mb-3';

	const recipient = document.createElement('input');
	recipient.type = 'email';
	recipient.placeholder = 'recipient@adress.com';
	recipient.className = 'input-group-text';

	const subj = document.createElement('input');
	subj.placeholder = 'subject';
	subj.className = 'input-group-text';

	const text = document.createElement('textarea');
	text.placeholder = 'your message in raw format';
	text.className = 'form-control';

	const submitBtn = document.createElement('button');
	submitBtn.innerText='Send';
	submitBtn.className = 'btn btn-secondary';
  
	form.appendChild(recipient);
	form.appendChild(subj);
	form.appendChild(text);
	form.appendChild(submitBtn);
	document.body.appendChild(form);
	// ----------------------------------------------------------------------
	// sending data to process ----------------------------------------------
	const send = (e) =>{
		e.preventDefault();
		
		// show loading
		document.getElementById('loading').style.visibility = 'visible';
		
		window.api.send('sendPost', {
			email: document.getElementById('email').value,
			password: document.getElementById('pwd').value,
			to: recipient.value,
			text: text.value,
			subj: subj.value,
		});

		window.api.receive('sendPostRes', () => {
			// hide loading
			document.getElementById('loading').style.visibility = 'hidden';
		});
	};
	// ----------------------------------------------------------------------
	submitBtn.addEventListener('click', send);
};

export default sendPost;