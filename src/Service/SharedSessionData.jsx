import axios from "axios";
import { Subject } from "rxjs";

let userData = new Subject();
const GetSessionData = () => {
  debugger;
  return userData.asObservable();
};

const setSessionData = (sessiondata) => {
  userData.next(sessiondata);
};
export { GetSessionData, setSessionData };
