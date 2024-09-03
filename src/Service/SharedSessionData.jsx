import { BehaviorSubject } from "rxjs";

// Create a BehaviorSubject to hold the session data with an initial value of null
const sessionSubject = new BehaviorSubject(null);

// Function to set session data
export const setSessionData = (sessionData) => {
  sessionSubject.next(sessionData); // Push the new session data into the BehaviorSubject
};

// Function to get the session data as an observable
export const getSessionData = () => {
  return sessionSubject.asObservable(); // Return the observable for session data
};
