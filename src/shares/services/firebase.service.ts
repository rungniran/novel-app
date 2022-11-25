
import {initializeApp } from "firebase/app"
import { getDatabase} from "firebase/database"
import { getAnalytics, logEvent } from "firebase/analytics";
import { firebasekey } from '@/shares/constants'

export const app = initializeApp(firebasekey);
export const firedatabase = getDatabase(app);


export const analytics = getAnalytics(app); 

logEvent(analytics, 'notification_received');