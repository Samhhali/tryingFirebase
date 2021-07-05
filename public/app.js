const auth = firebase.auth();
const { serverTimestamp } = firebase.firestore.FieldValue;


// Grap HTML elements
const whenSignedIn = document.getElementById("whenSignedIn")
const whenSignedOut = document.getElementById("whenSignedOut")

const signInBtn = document.getElementById("signInBtn")
const signOutBtn = document.getElementById("signOutBtn")

const userDetails = document.getElementById("userDetails")

//login with google account
const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => auth.signInWithPopup(provider);
signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if (user) {
        //Sign in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `<h3> Hello ${user.displayName}! </h3> <p>User ID: ${user.uid}</p>`
    } else {
        //not Sign in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
    }
})

// Firestore


const db = firebase.firestore();

const createThing = document.getElementById('createThing');
const thingsList = document.getElementById('thingsList');


let thingsRef;      //reference to database location
//let unsubscribe;      // turn off realtime streaming

auth.onAuthStateChanged(user => {
    if (user) {
        //Sign in
        thingsRef = db.collection('things')

        createThing.onclick = () => {

            const { serverTimestamp } = firebase.firestore.FieldValue;

            thingsRef.add({
                uid: user.uid,
                name: "",
                createdAt: serverTimestamp()
            });
        }


    }
});