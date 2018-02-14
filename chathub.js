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
    let auth = document.getElementById('auth');
    let incorrect = document.getElementById('incorrect');
    let incorrectBtn = document.getElementById('incorrect-btn');
	var uname;
	const database = firebase.database();
	let ref = database.ref('users/');
    
	//chat functions
	username.addEventListener('keyup', function (event) {
		getUserInput()
	});
	join.addEventListener('click', function (event) {
		login()
		getMessages()
	});
	signout.addEventListener('click', function (event) {
		logout()
	})
    incorrectBtn.addEventListener('click', function (event) {
        closeBtn();
    })
	send.addEventListener('click', function (event) {
		typeMsg();
        clearField();
	})
	//get user info
	function getUserInput() {
		const user = {
			name: username.value
		}
		let userName = JSON.stringify(user);
		window.localStorage.setItem('user', userName);
        
        //validate username
        if (username.value == "") {
            join.style.opacity = 0.6;
        } else {
            join.style.opacity = 1;
        }
	}
	//login function
	function login(user) {
		let myUser = localStorage.getItem('user');
        
        if (localStorage.getItem('user') === null) {
            incorrect.style.display = 'block';
            join.style.opacity = 0.4;
        } else {
            input.value = localStorage.getItem('user');
            incorrect.style.display = 'none';
        }
        
		let profile = document.createElement('span');
		let obj = JSON.parse(myUser);
        
        if (obj === null) {
            incorrect.style.display = 'block';
            join.style.opacity = 0.7;
        } else {
            incorrect.style.display = 'none';
            uname = obj.name;
            profile.innerHTML = `${uname}`;
            info.appendChild(profile);
            info.classList.remove('hidden');
            chat.classList.remove('hidden');
            input.classList.add('hidden');
            auth.classList.add('hidden');
        }
	}
	//logout function
	function logout(user) {
		localStorage.removeItem('user');
		info.classList.add('hidden');
		chat.classList.add('hidden');
		input.classList.remove('hidden');
		window.location.reload();
	}
    //close incorrect button
    function closeBtn() {
        incorrect.style.display = 'none';
    }
	//push message function to database
	function typeMsg(user) {
        
        chatwindow.innerText = ' ';
        chatwindow.innerHTML = ' ';
        
        var monthNames = ["januari", "februari", "mars", "april", "maj", "juni",
          "juli", "augusti", "september", "oktober", "november", "december"];
        
		let msgID = message.value;
		let date = new Date();
		let time = date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getHours() + ':' + ('0'+date.getMinutes()).slice(-2);
        
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
		p.innerHTML = `<strong>${name}:</strong> ${msg} <br /> <pre>${time}</pre>`;
		chatwindow.appendChild(p);
	}
    //clear field
    function clearField() {
        message.value = '';
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
            chatwindow.scrollTop = chatwindow.scrollHeight;
		})
	}
});