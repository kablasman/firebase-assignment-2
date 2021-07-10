document.addEventListener("DOMContentLoaded", function () {
    firebase.auth().onAuthStateChanged(function (user) {
      console.log("user", user);
      if (user) {
        firebase.auth().signOut();
        window.location = 'index.html'; // after logout the user must go to the home i.e index.html page
      }
    });
  });


//pre loader 

const loaderWrapper = document.querySelector('.loader-wrapper')
const preLoader = document.querySelector('.loader')

setTimeout(function() {
  loaderWrapper.style.display = 'none';
  preLoader.style.display = 'none';

}, 2000);