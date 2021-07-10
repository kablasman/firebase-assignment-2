document.addEventListener("DOMContentLoaded", function () {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const update = document.getElementById("update");
    const profileimg = document.querySelector(".profile-image");

    const db = firebase.firestore();
    let userRef = null;

    update.addEventListener("click", function () {
      if (firstname.value && lastname.value) {
        updateUser(userRef.uid, firstname.value, lastname.value)
      }
    });

    //grab data from database, find user based on uid
    function updateUser(uid, first, last) {
      db.collection("Users").doc(uid).update({
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
        firebase.storage().ref(`avaters/${user.uid}.jpg`).getDownloadURL().then(imgUrl => {
          profileimg.setAttribute('src',imgUrl)
          console.log(imgUrl);
        })
      }
      else {
        window.location = "login.html";
      }
    });
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