// firebase-config.js - SIMPLE VERSION
const firebaseConfig = {
    apiKey: "AIzaSyCHgAYojR7DKdDggKzOLPGt3ve4UFYARlk",
    authDomain: "terminal-chat-496ab.firebaseapp.com",
    projectId: "terminal-chat-496ab",
    storageBucket: "terminal-chat-496ab.firebasestorage.app",
    messagingSenderId: "795826366850",
    appId: "1:795826366850:web:c666478a25beff3c07079b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Auth
const auth = firebase.auth();

// Export for modular use
if (typeof module !== 'undefined') {
    module.exports = { firebaseConfig, db };
}