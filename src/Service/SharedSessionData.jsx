import { BehaviorSubject } from "rxjs";

const sessionSubject = new BehaviorSubject(null);

export const setSessionData = (sessionData) => {
  sessionSubject.next(sessionData);
};

export const getSessionData = () => {
  return sessionSubject.asObservable();
};
