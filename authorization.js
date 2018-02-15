document.addEventListener('DOMContentLoaded', function () {

const database = firebase.database();
let githubLogin = document.getElementById('githubLogin');

//Add login event
githubLogin.addEventListener('click', function(event){
    
})
    
    
let provider = new firebase.auth.GithubAuthProvider();


firebase.auth().signInWithPopup(provider)
    .then(function(result) {
	// Om autentisering lyckas, så finns användarinfo i user
	let user = result.user;
});
    
    
    
// Logga ut den autentiserade användaren
firebase.auth().signOut()
.then(function(result) {
	// Utloggning lyckades
})
.catch(function(error) {
	// Utloggning misslyckades
});

    
    
    
    
});