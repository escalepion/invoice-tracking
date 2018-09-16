import firebase from "firebase";

export function signupApi(email, password, username, language) {
  return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      firebase.database().ref(`users/${res.user.uid}`).set({ username, language })
      .then(() => resolve(res))
      .catch((error) => reject(error));
    })
    .catch(error => reject(error));
  });
}