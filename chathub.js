document.addEventListener('DOMContentLoaded', function () {
	let username = document.getElementById('username');
	let input = document.getElementById('input');
	let join = document.getElementById('join');
	let info = document.getElementById('info');
	let chat = document.getElementById('chat');
	let signout = document.getElementById('signout');
	let message = document.getElementById('message');
	let send = document.getElementById('send');
	let chatwindow = document.getElementById('chatwindow');
	var uname;
	const database = firebase.database();
	let ref = database.ref('users/');
	//chat functions
	username.addEventListener('change', function (event) {
		getUserInput()
	});
	join.addEventListener('click', function (event) {
		login()
		getMessages()
	});
	signout.addEventListener('click', function (event) {
		logout()
	})
	send.addEventListener('click', function (event) {
		typeMsg();
	})
	//get user info
	function getUserInput() {
		const user = {
			name: username.value
		}
		let userName = JSON.stringify(user);
		window.localStorage.setItem('user', userName);
	}
	//login function
	function login(user) {
		let myUser = localStorage.getItem('user');
		let profile = document.createElement('span');
		uname = JSON.parse(myUser).name;
		profile.innerHTML = `${uname}`;
		info.appendChild(profile);
		info.classList.remove('hidden');
		chat.classList.remove('hidden');
		input.classList.add('hidden');
	}
	//logout function
	function logout(user) {
		localStorage.removeItem('user');
		info.classList.add('hidden');
		chat.classList.add('hidden');
		input.classList.remove('hidden');
		window.location.reload();
	}
	//push message function to database
	function typeMsg(user) {
        chatwindow.innerText = ' ';
		let msgID = message.value;
		let date = new Date();
		let time = date.getHours() + ':' + date.getMinutes();
		let fullMsg = {
			msg: msgID,
			name: uname,
			sent: time
		}
		ref.push(fullMsg);
	}
	//create messagebox 
	function createMsg(name, msg, time) {
		let p = document.createElement('p');
		p.className = 'messages';
		p.innerHTML = `<strong>${name}:</strong> ${msg} <br /> ${time}`;
		chatwindow.appendChild(p);
		chatwindow.insertBefore(p, chatwindow.childNodes[0]);
	}
	//get messages from database 
	function getMessages() {
		ref.on('value', function (snapshot) {
			let allMessages = snapshot.val();
			let keys = Object.keys(allMessages);
			for (i = 0; i < keys.length; i++) {
				let x = keys[i];
				let name = allMessages[x].name;
				let msg = allMessages[x].msg;
				let time = allMessages[x].sent;
				createMsg(name, msg, time);
			}
		})
	}
});