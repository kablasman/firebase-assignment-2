document.addEventListener("DOMContentLoaded", function () {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const update = document.getElementById("update");
    const list = document.querySelector('#userList'); // variable to access the ul from account.html with the id = userList

    const db = firebase.firestore();
    let userRef = null;

    update.addEventListener("click", function () {
      if (firstname.value && lastname.value) {
        updateUser(userRef.uid, firstname.value, lastname.value)
      }
    });

    //grab data from database, find user based on uid
    function updateUser(uid, first, last) {
      db.collection("Users").doc(uid).update() ({
        firstname: first,
        lastname: last,
      }).then(function() {
        console.log("User updated!");
      }).catch(function(error) {
        console.error(error);
      });
    }

    function getUser(uid) {
      db.collection("Users").doc(uid).get().then(function(doc) {
        firstname.value = doc.data().firstname;
        lastname.value = doc.data().lastname;
      }).catch(function(error) {
        console.error(error);
      })
    }

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        userRef = user;
        getUser(user.uid);
      }
      else {
        window.location = "login.html";
      }
    });
    // displaying the data of registered users on with contact information.
    // makeList method is creating list items and displaying the registered users with contact info and profession
    const makeList = (doc) =>{
      let li = document.createElement('li');
      let name = document.createElement('span');
      let phone = document.createElement('span');
      let profession = document.createElement('span');


      li.setAttribute('user-id', doc.id);
      li.className = 'userInfo';
      name.className = 'userName';
      phone.className = 'userPhone';
      profession.className = 'userProfession';
      name.textContent = doc.data().firstname+" "+doc.data().lastname;
      phone.textContent = doc.data().Tel;
      profession.textContent = doc.data().Profession[0];  

      li.appendChild(name);
      li.appendChild(phone);
      li.appendChild(profession);

      list.appendChild(li);
    }

    db.collection('Users').get().then((snapshot)=>{
      snapshot.docs.forEach(doc =>{
        makeList(doc);
      })
    })
  });


// button effect

let homeButton = document.querySelector('#update')

homeButton.addEventListener('click', () => homeButton.style.backgroundColor = '#000') 

//pre loader 

const loaderWrapper = document.querySelector('.loader-wrapper')
const preLoader = document.querySelector('.loader')

setTimeout(function() {
  loaderWrapper.style.display = 'none';
  preLoader.style.display = 'none';

}, 2000);