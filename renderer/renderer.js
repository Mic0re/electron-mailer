import getPostList from './getPostList.js';
import sendPost from './sendPost.js';


const lesssecure = () => {
	window.api.send('lesssecure', {});
}
const imap = () => {
	window.api.send('imap', {});
}

document.getElementById('OpenPost').addEventListener('click', getPostList);
document.getElementById('SendPost').addEventListener('click', sendPost);
document.getElementById('lesssecure').addEventListener('click', lesssecure);
document.getElementById('imap').addEventListener('click', imap);

// show error in snackbar
window.api.receive('receiveError', (data) => {
	console.log(data);
	document.getElementById('loading').style.visibility = 'hidden';
	const snack = document.getElementById('snackbar');
	snack.className = 'show';
	snack.innerText = data;
	// After 3 seconds, remove the show class from DIV
	setTimeout(() => { snack.className = snack.className.replace('show', ''); }, 3000);
});