document.addEventListener("DOMContentLoaded", function () {

    const auth = document.getElementById("auth")
    const noAuth = document.getElementById("no-auth")
    const tableView = document.querySelector('.userDisp');
    const list = document.querySelector('#userList'); // variable to access the table from index.html with the id = userList
    const db = firebase.firestore();

    firebase.auth().onAuthStateChanged(function (user) {
      console.log("user", user);

      // if user exists we are logged in
      if (user) {
        auth.style.display = "block";
        noAuth.style.display = "none";
        tableView.style.display = 'table';
        // displaying the data of registered users on with contact information.
        //------------------------------------------------------------------------------------------------------------------------------------
        // makeList method is creating list items and displaying the registered users with contact info and profession
        const makeList = (doc) =>{
          let tr = document.createElement('tr');
          let name = document.createElement('td');
          let phone = document.createElement('td');
          let profession = document.createElement('td');


          tr.setAttribute('user-id', doc.id);
          tr.className = 'userInfo';
          name.className = 'userName';
          phone.className = 'userPhone';
          profession.className = 'userProfession';
          name.textContent = doc.data().firstname+" "+doc.data().lastname;
          phone.textContent = doc.data().Tel;
          profession.textContent = doc.data().Profession[0];  

          tr.appendChild(name);
          tr.appendChild(phone);
          tr.appendChild(profession);

          list.appendChild(tr);
        }
        // getting the data from collection 'Users' from firestore to display on the account.html page
        db.collection('Users').get().then((snapshot)=>{
          snapshot.docs.forEach(doc =>{
            makeList(doc);
          })
        })
        //------------------------------------------------------------------------------------------------------------------------------------

      } else {
        auth.style.display = "none";
        noAuth.style.display = "block";
        tableView.style.display = 'none';
      }
    });
});

// button effect

let homeButton = document.querySelector('#register')

homeButton.addEventListener('click', () => homeButton.style.backgroundColor = '#000') 

//pre loader 

const loaderWrapper = document.querySelector('.loader-wrapper')
const preLoader = document.querySelector('.loader')

setTimeout(function() {
  loaderWrapper.style.display = 'none';
  preLoader.style.display = 'none';

}, 2000);