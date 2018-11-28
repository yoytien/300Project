
(function(){
   
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDCfAwKSZ-q3GaiPK8Di5bWCCh8jTImbdI",
    authDomain: "sas92-10d48.firebaseapp.com",
    databaseURL: "https://sas92-10d48.firebaseio.com",
    projectId: "sas92-10d48",
    storageBucket: "sas92-10d48.appspot.com",
    messagingSenderId: "501650310659"
  };
  firebase.initializeApp(config);
  var txtEmail = document.getElementById("txtEmail");
  var txtPss = document.getElementById("txtPss");
  var BtnLogin = document.getElementById("BtnLogin");
  var BtnSignUp = document.getElementById("BtnSignUp");
  var BtnLogOut = document.getElementById("BtnLogOut");

BtnLogin.addEventListener('click', e=>{
console.log(txtEmail.value);
    var email = txtEmail.value;
    var pass = txtPss.value;
 var auth = firebase.auth();

    var promise=  auth.signInWithEmailAndPassword(email,pass);
    promise.catch(e=>console.log(e.message));
});
BtnSignUp.addEventListener('click',e=>{
    var email = txtEmail.value;
    var pass = txtPss.value;
    var auth = firebase.auth();

    var promise=  auth.createUserWithEmailAndPassword(email,pass);
    promise.catch(e=>console.log(e.message));

});

firebase.auth().onAuthStateChanged(firebaseUser =>{
    if (firebaseUser){
        console.log(firebaseUser);
    } 
    else {
        console.log('not logged in');
    }

});




})()

