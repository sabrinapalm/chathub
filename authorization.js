document.addEventListener('DOMContentLoaded', function () {

const database = firebase.database();
let githubLogin = document.getElementById('githubLogin');

//Add login event
githubLogin.addEventListener('click', function(event){
    
})
    
    
var provider = new firebase.auth.GithubAuthProvider();

provider.addScope('repo');


provider.setCustomParameters({
  'allow_signup': 'false'
});


firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
    
    
firebase.auth().signInWithRedirect(provider);


firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});