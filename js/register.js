document.addEventListener("DOMContentLoaded", function() {
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const register = document.getElementById("register");

    const db = firebase.firestore();

    function addUser(uid, first, last) {
      db.collection("Users")
        .doc(uid)
        .set({
          firstname: first,
          lastname: last,
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
      if (email.value && password.value) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(function (data) {
            console.log("data", data);
            const user = firebase.auth().currentUser;
            addUser(user.uid, firstname.value, lastname.value);
          })
          .catch(function (error) {
            console.error(error);
          })
      }
    })
  })