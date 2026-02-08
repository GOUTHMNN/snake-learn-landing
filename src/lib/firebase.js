import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // IMPORT RTDB
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    databaseURL: "https://snakelearn-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Safe Initialization
let app = null;
let db = null;
let rtdb = null;
let analytics = null;

const requiredKeys = ['apiKey', 'projectId', 'appId'];
const missingKeys = requiredKeys.filter(key => !firebaseConfig[key]);

if (missingKeys.length > 0) {
    console.warn(`[SnakeLearn] Missing Firebase Environment Variables: ${missingKeys.join(', ')}. Firebase services will be disabled.`);
} else {
    try {
        app = initializeApp(firebaseConfig);

        // Initialize Services safely
        try {
            db = initializeFirestore(app, {
                experimentalAutoDetectLongPolling: true
            });
        } catch (e) { console.error("Firestore init failed", e); }

        try {
            rtdb = getDatabase(app);
        } catch (e) { console.error("RTDB init failed", e); }

        try {
            analytics = getAnalytics(app);
        } catch (e) { console.warn("Analytics init failed (likely due to ad blocker or local env)", e); }

        console.log('[SnakeLearn] Firebase connected successfully.');
    } catch (error) {
        console.error('[SnakeLearn] Firebase initialization error:', error);
    }
}

export { app, db, rtdb, analytics };
export const auth = null; // Explicitly null per requirements
