


function CreatUser(){
  auth.createUserWithEmailAndPassword(infoUser.email, infoUser.password).then((data)=>{
    var userId = data.user.uid;
    
    db.collection('users').doc(userId).set(infoUser).then((docRef)=>{
      // data posted successfully
      Confirm_Register();
    })
    .catch((error)=>{
      alert('Error posting user data')
    
    })

  })
  .catch((error)=>{
  
    alert('Error creating a new user')
    if(error.code == "auth/email-already-in-use"){
      alert('The email address is already in use by another account')
    }
  })

}


function SignIn(){

  let email = document.querySelector('#logIn-email').value;
  let password = document.querySelector("#logIn-passwrd").value;

  auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{
    auth.signInWithEmailAndPassword(email, password).then((userCredential)=>{ // signIn user
      let userId = userCredential.user.uid;

      db.doc(`users/${userId}`).get().then((doc)=>{ // getting data user
        ShowInformationUser();
        SetInfoUser(doc.data());
      })
      .catch((error)=>{
        console.log(error)
    
      })
    }).catch((error)=>{
      alert('Sign In Error');

    })
  }).catch(()=>{
    // persistence error
  })
  
}


function SetInfoUser(data){
  document.querySelector('#td-first_name').innerText = data.first_name;
  document.querySelector('#td-last_name').innerText = data.last_name;
  document.querySelector('#td-birthday').innerText = data.birthday;
  document.querySelector('#td-nationality').innerText = data.nationality;
  document.querySelector('#td-email').innerText = data.email;
  document.querySelector('#td-phone').innerText = data.phone;
  document.querySelector('#td-passwrd').innerText = data.password;
  document.querySelector('#td-gender').innerText = data.gender;
}
