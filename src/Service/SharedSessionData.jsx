import { Subject } from "rxjs";

// Create a new Subject to hold session data
let userData = new Subject();

// Function to set the session data
const setSessionData = (sessionData) => {
  userData.next(sessionData); // Emit the session data to subscribers
};

// Function to get the session data as an observable
const GetSessionData = () => {
  debugger;
  return userData.asObservable(); // Return the observable for session data
};

export { GetSessionData, setSessionData };
