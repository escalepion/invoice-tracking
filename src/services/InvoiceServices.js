import firebase from 'firebase';

export function createCategoryApi(categoryName, uid) {
  return new Promise((resolve, reject) => {
    firebase.database().ref(`${uid}/categories`).push({ categoryName })
    .then((res) => resolve(res))
    .catch((error) => reject(error));
  });
}

export function fetchCategoriesApi(uid) {
  return new Promise((resolve) => {
    firebase.database().ref(`${uid}/categories`)
    .on('value', function(snapshot) {
      resolve(snapshot.val());
    })
  });
}
