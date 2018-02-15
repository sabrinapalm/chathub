document.addEventListener('DOMContentLoaded', function () {

const database = firebase.database();
let githubLogin = document.getElementById('githubLogin');

let provider = new firebase.auth.GithubAuthProvider();

//Add login event
githubLogin.addEventListener('click', function(event){
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
	// Om autentisering lyckas, så finns användarinfo i user
	let user = result.user;
});
})
    
    


    
    
    
// Logga ut den autentiserade användaren
firebase.auth().signOut()
.then(function(result) {
	// Utloggning lyckades
})
.catch(function(error) {
	// Utloggning misslyckades
});

    
    
    
    
});