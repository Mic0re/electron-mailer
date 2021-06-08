const generateTable = (data) => {
	// delete previous results and forms
	document.getElementById('mailTable') === null ? null : document.getElementById('mailTable').remove();
	document.getElementById('sendForm') === null ? null : document.getElementById('sendForm').remove();

	// generating table header ----------------------
	const body = document.body;
	const tbl = document.createElement('table');
	tbl.id = 'mailTable';
	tbl.className = 'table table-striped';
	
	const tblBody = document.createElement('tbody');
	const row = document.createElement('tr');

	const subj = document.createElement('th');
	subj.innerText = 'Subject';
	subj.scope = 'col';

	const from = document.createElement('th');
	from.innerText = 'From';
	from.scope = 'col';

	const date = document.createElement('th');
	date.innerText = 'Date';
	date.scope = 'col';

	row.appendChild(subj);
	row.appendChild(from);
	row.appendChild(date);
	tblBody.appendChild(row);
	// ----------------------------------------------

	// generating table content ---------------------
	data.forEach (el => {
		const row = document.createElement('tr');
    
		const subj = document.createElement('td');
		subj.innerText = el.subject;
		const from = document.createElement('td');
		from.innerText = el.from.text;
		const date = document.createElement('td');
		date.innerText = el.date;

		row.appendChild(subj);
		row.appendChild(from);
		row.appendChild(date);

		tblBody.appendChild(row);
	});
	// ----------------------------------------------
	
	// rendering table with content -----------------
	tbl.appendChild(tblBody);
	body.appendChild(tbl);
	tbl.setAttribute('border', '2');
	// ----------------------------------------------
};

export default generateTable;