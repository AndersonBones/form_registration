let signUp_btn = document.querySelector('#signUp-btn');
let signUp_form = document.querySelector(".signUp-form");

var fileInput = document.querySelector('#profile-photo');

let signIn_btn = document.querySelector('#signIn-btn');
let signIn_form = document.querySelector('.signIn-form');

var confirm_msg = document.querySelector('.complete-registration');
var user_information = document.querySelector(".user-information");
var back_btn = document.querySelector('.back-btn');

var to_user_info = document.querySelector('#user-info-btn');
var back_main_section = document.querySelector('#signUp-section');

var infoUser = {};

const firebaseConfig = {
    apiKey: "AIzaSyC1LiYztG_YBHXx-Tyd4zYj516yOTOqL0s",
    authDomain: "projeto01-9deb6.firebaseapp.com",
    databaseURL: "https://projeto01-9deb6-default-rtdb.firebaseio.com",
    projectId: "projeto01-9deb6",
    storageBucket: "projeto01-9deb6.appspot.com",
    messagingSenderId: "265170965931",
    appId: "1:265170965931:web:6d255e0a13ea6626d96eee"
  };
  
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const ref = storage.ref('/profile_photos');



var FILE = '';
fileInput.addEventListener("change",(e)=>{
    FILE = e.target.files[0]
})

// ainda falta definir o nome das photos com o gmail do usuario

function CreatInfoUser(){
    
    infoUser = {
        first_name: document.querySelector('#Fname').value,
        last_name: document.querySelector("#Lname").value,
        birthday: document.querySelector("#birthday").value,
        nationality: document.querySelector('#nationality').value,
        email: document.querySelector("#email-signUp").value,
        phone: document.querySelector('#phone').value,
        password: document.querySelector("#passwrd").value,
        gender: document.querySelector('input[name="fav_language"]:checked').value
  }
}

onload = function(){
    $(signIn_form).hide();
    $(confirm_msg).hide();  
    $(user_information).hide();  
}

function SignIn_section(){
    $(signUp_form).hide();
    $(signIn_form).fadeIn();

    changeColor_btn(this, signUp_btn)
}
signIn_btn.addEventListener('click',SignIn_section)

function SignUp_section(){
    $(signUp_form).fadeIn();
    $(signIn_form).hide();

    changeColor_btn(this, signIn_btn)
}

function changeColor_btn(showSection, hideSection){
    showSection.style.backgroundColor = '#ed8f03';
    showSection.style.boxShadow = 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px';
    hideSection.style.backgroundColor = '#ed8f0386';
    hideSection.style.boxShadow = 'none';
}

signUp_btn.addEventListener('click',SignUp_section)


function Confirm_Register(){
    $(signUp_form.parentElement).hide();
    
    $(confirm_msg).fadeIn();
}

signUp_form.addEventListener('submit', (e)=>{
    e.preventDefault(); 
    CreatInfoUser();
    CreatUser();

    
});



function ShowInformationUser(){
    $(signIn_form.parentElement).hide();
    $(user_information).fadeIn();
}

signIn_form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    SignIn();
})


back_btn.addEventListener('click', ()=>{
   location.reload();
})


back_main_section.addEventListener('click', ()=>{
    location.reload();
})

to_user_info.addEventListener("click",()=>{
    $(signUp_form).fadeOut();
    $(confirm_msg).fadeOut();

    $(signUp_form.parentElement).fadeIn();
    $(signIn_form).fadeIn();
    
    changeColor_btn(signIn_btn, signUp_btn);
})

to_user_info.addEventListener("click", Reset_form);

function Reset_form(){
    $(signUp_form)[0].reset();
}


var emails_list = [];

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let email_user = doc.data().email;
        emails_list.push(email_user);
    });
});

function validateEmail() {
	var email_input = document.querySelector("#email-signUp");
    var email_in_use = false;

    for(var i=0; i<emails_list.length; i++){
        
        if(email_input.value == emails_list[i]){
            email_in_use = true;
        }
    }

    if(email_in_use == true){
        email_input.setCustomValidity('The email address is already in use by another account');
    }
    
    else{
        email_input.setCustomValidity('');   
    }

}


// VALIDATE PASSWORD
var password = document.getElementById("passwrd")
var confirm_password = document.getElementById("confirm-passwrd");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  }

  else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;


 // Toggle eye icon in password input
let eye_icon = $("#toggle-passwrd_logIn");
let input_passwrd = $("#logIn-passwrd");
eye_icon.click(()=>{
    if(input_passwrd.attr('type') == 'password'){
        input_passwrd.attr('type', 'text');
    }
    else{
        input_passwrd.attr('type', 'password');
    }
    
    eye_icon.toggleClass('bi-eye');
})
