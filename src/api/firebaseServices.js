import { db } from "../firebase/config";

export const subscribe = ({ path, callback, event = "value" }) => {
  const ref = db().ref(path);
  const cb = (snapshot) => {
    callback(snapshot.val());
  };

  ref.on(event, cb, handleErrors);
  return () => ref.off(event, cb);
};

const handleErrors = (error) =>{
    console.error(error);
}