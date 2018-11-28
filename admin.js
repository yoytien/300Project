window.alert("in the admin.js");

var submit = document.getElementById("AButon");
//test 

function submit1(){
    window.alert("in the onclick function");
var firebaseRef = firebase.database().ref();
firebaseRef.child("Matric").set("135423")
window.alert("update the firebase");
}