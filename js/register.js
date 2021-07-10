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
    const avatar = document.getElementById("avatar");
    let file = ""
    let filename = ""
    let extention = ""
    const fbFolder = "avaters";


    const db = firebase.firestore();

    function addUser(uid, first, last, tel, city, country, profx, avatarImg, summary) {

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
          Avatar: avatarImg,
          summary: summary,
          user: uid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function () {
          console.log("User added to database!");
        })
        .catch(function (error) {
          console.error(error);
        });
    }


    //  the file upload button
    avatar.addEventListener("change", function (e) {
      file = e.target.files[0]
      filename = file.name.split(".").shift()
      extention = file.name.split(".").pop()
    })

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
            let user = firebase.auth().currentUser;
            const profx = [...profession.selectedOptions].map(option => option.value);

            // ===========================================================================
            //  Uploading the user's Avatar image into firebase storage
            const avatarImg = ""
            if (filename) {         
              //  Create a storage ref
              const storageRef = firebase
                  .storage()
                  .ref(`${fbFolder}/${user.uid}.${extention}`);
                  const avatarImg = storageRef.put(file);
      
                  console.log(avatarImg)
            }
            // ===========================================================================

            addUser(user.uid, firstname.value, lastname.value, tel.value, city.value, country.value, profx, avatarImg, summary.value);
          })
          .catch(function (error) {
            console.error(error);
          })
      }
    })
})
