document.addEventListener("DOMContentLoaded", function() {
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const tel = document.getElementById("tel");
    const city = document.getElementById("city");
    const country = document.getElementById("country");
    const profession = document.getElementById("profession");
    const summary = document.getElementById("summary");
    const register = document.getElementById("register");

    const db = firebase.firestore();

    function addUser(uid, first, last, tel, city, country, profx, summary) {

        console.log(profx)
        console.log(tel)
        console.log(city)
        console.log(country)
        console.log(profession)
        console.log(summary)

      db.collection("Users")
        .doc(uid)
        .set({
          firstname: first,
          lastname: last,
          Tel: tel,
          city: city,
          country: country,
          Profession: profx,
          summary: summary,
          user: uid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function () {
          console.log("User added to database!");
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    // waits for both email and password to submit
    register.addEventListener("click", function () {
      const profx = [...profession.selectedOptions]
      .map(option => option.value);

      if (email.value && password.value) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(function (data) {
            console.log("data", data);
            const user = firebase.auth().currentUser;
            const profx = [...profession.selectedOptions]
            .map(option => option.value);
            addUser(user.uid, firstname.value, lastname.value, tel.value, city.value, country.value, profx, summary.value);
            // To clear out the input fields after a user clicks the 'Create Account Button'
            //-----------------------------------------------------------------------------
            firstname.value = '';
            lastname.value = '';
            email.value = '';
            password.value = '';
            tel.value = '';
            city.value = '';
            country.value = '';
            summary.value = '';
            //-----------------------------------------------------------------------------
          })
          .catch(function (error) {
            console.error(error);
          })
      }
    })
})

// button effect

let regButton = document.querySelector('#register')

regButton.addEventListener('click', () => regButton.style.backgroundColor = '#000') 

// pre loader 

const loaderWrapper = document.querySelector('.loader-wrapper')
const preLoader = document.querySelector('.loader')

setTimeout(function() {
  loaderWrapper.style.display = 'none';
  preLoader.style.display = 'none';

}, 2000);