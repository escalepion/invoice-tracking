import firebase from "firebase";

export function signupApi(email, password, username, language) {
  return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      firebase.database().ref(`${res.user.uid}/userInfo`).set({ username, language })
      .then(() => resolve(res))
      .catch((error) => reject(error));
    })
    .catch(error => reject(error));
  });
}
export function signinApi(email, password) {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => resolve(res))
    .catch(error => reject(error));
  });
}

export function fetchCurrentUserInfo(uid) {
  return new Promise((resolve, reject) => {
    firebase.database().ref(`${uid}/userInfo`)
    .once('value')
    .then((snapshot) => {
      resolve(snapshot.val())
    })
    .catch(err => reject(err));
  });
}