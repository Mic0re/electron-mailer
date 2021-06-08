import generateTable from './generateTable.js';

const getPostList = (e) => {
	e.preventDefault();
	
	// show loader
	document.getElementById('loading').style.visibility = 'visible';
	
	window.api.send('getPost', {
		email: document.getElementById('email').value,
		password: document.getElementById('pwd').value
	});

	window.api.receive('receivePost', (data) => {
		data.reverse();
		console.log(data)
		// hide loader
		document.getElementById('loading').style.visibility = 'hidden';
		generateTable(data);		
	});
};
export default getPostList;