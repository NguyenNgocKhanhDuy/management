// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAc_yg5itPB3X4VlCLw6z2DotSz-uhv6kg",
	authDomain: "management-71234.firebaseapp.com",
	projectId: "management-71234",
	storageBucket: "management-71234.appspot.com",
	messagingSenderId: "354337781871",
	appId: "1:354337781871:web:bf85a572f853c2e1e3759a",
	measurementId: "G-45PKLR5JQW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };