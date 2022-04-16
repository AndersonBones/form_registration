


var Id = '';
function CreatUser(){
  auth.createUserWithEmailAndPassword(infoUser.email, infoUser.password).then((data)=>{
    var userId = data.user.uid;
    Id = userId;
    
    db.collection('users').doc(userId).set(infoUser).then((docRef)=>{
      // data posted successfully
      Upload_photo();
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
  document.querySelector('#img-photo').setAttribute('src', data.photoUrl);
}


function Upload_photo(){

  
  ref.child(FILE.name).put(FILE).then((snapshot)=>{

    ref.child(FILE.name).getDownloadURL().then((url)=>{ // retorna a URL do arquivo

      db.collection('users').doc(Id).update({photoUrl:url}).then((docRef)=>{
        // data posted successfully
        
      })

    })

  })
}
