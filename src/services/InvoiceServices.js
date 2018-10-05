import firebase from 'firebase';
import { eventChannel } from 'redux-saga';

export function createCategoryApi(categoryName, uid) {
  return new Promise((resolve, reject) => {
    firebase.database().ref(`${uid}/categories`).push({ categoryName })
    .then((res) => resolve(res))
    .catch((error) => reject(error));
  });
}

export function fetchCategoriesApi(uid) {
  const ref = firebase.database().ref(`${uid}/categories`)
  const channel = eventChannel(emit => {
      ref.on('value', snapshot => {
        emit({ categories : snapshot.val()});
      });
      return () => ref.off();
    })	
  return channel; 
  // return new Promise((resolve) => {
  //   firebase.database().ref(`${uid}/categories`)
  //   .on('value', function(snapshot) {
  //     resolve(snapshot.val());
  //   })
  // });
}

export function deleteCategoryApi(uid, categoryId) {
  return new Promise((resolve, reject) => {
    firebase.database().ref(`${uid}/categories/${categoryId}`)
    .remove()
    .then(res => resolve(res))
    .catch(error => reject(error));
  }); 
}
