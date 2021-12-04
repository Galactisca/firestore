// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpT519AsxmZ0zqTx9Aw9ZqLmcQZs6gmkE",
  authDomain: "mockdb-123.firebaseapp.com",
  projectId: "mockdb-123",
  storageBucket: "mockdb-123.appspot.com",
  messagingSenderId: "841215532441",
  appId: "1:841215532441:web:a21f0d9410f0ef4a360708",
  measurementId: "G-BM2RQKSZ5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
const usersColRef = collection(db, 'users');
const tasksColRef = collection(db, 'users', 'username1', 'tasks');
// getDocs(usersColRef)
// 	.then(snapshot => {
// 		snapshot.docs.forEach(doc => {
// 			// console.log(doc.data());
// 		}) 
// 	})
// 	.catch(err => console.log(err))
// getDocs(tasksColRef)
// 	.then(snapshot => {
// 		// snapshot.docs.forEach(doc => console.log(doc.data()));
// 	})
// 	.catch(err => console.log(err));


const addTaskForm = document.querySelector('.addTaskForm');
addTaskForm.addEventListener('submit', (e) => {
	e.preventDefault();
	addDoc(collection(db, 'users', window.sessionStorage.getItem('UID'), 'tasks'), {
		title: addTaskForm.title.value,
		description: addTaskForm.description.value
	}).then(console.log('task added'))
	.catch(err => console.log(err));
})

const showTaskBtn = document.querySelector('.showTask');
showTaskBtn.addEventListener('click', () => {
	getDocs(collection(db, 'users', window.sessionStorage.getItem('UID'), 'tasks'))
	.then(snapshot => {
		snapshot.docs.forEach(doc => {
			console.log(doc.data());
		}) 
	})
})

const login = document.querySelector('.login');
login.addEventListener('submit', (e) => {
	e.preventDefault();
	signInWithEmailAndPassword(auth, login.email.value, login.password.value)
		.then()
		.catch(err => console.log(err));
})

const logout = document.querySelector('.logout');
logout.addEventListener('click', () => {
	signOut(auth)
		.then(() => console.log('user loged out'))
		.catch(err => console.log(err));
})

const signup = document.querySelector('.signup');
signup.addEventListener('submit', (e) => {
	e.preventDefault();
	createUserWithEmailAndPassword(auth, signup.email.value, signup.password.value)
		.then((cred) => {createUserProfile(cred.user.uid)})
		.catch(err => console.log(err.message))
})

onAuthStateChanged(auth, userCred => {
	if (userCred) {window.sessionStorage.setItem('UID', userCred.uid)} else {window.sessionStorage.removeItem('UID')};
	console.log(userCred);
});

function createUserProfile (UID){
	setDoc(doc(db, 'users', UID), {
		tags: ["home", "work"]
	})
	.then(console.log('user profile created'))
	.catch(err => console.log(err));
}