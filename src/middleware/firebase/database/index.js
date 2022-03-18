import firebaseInstance from "../";
import database from "firebase/database";

function getRef(options) {
  return firebaseInstance.firebase
    .database()
    .ref(`users/${window.user.uid}/data/${options.tableName}`);
}

function get(options) {
  return firebaseInstance.firebase
    .database()
    .ref(`users/${window.user.uid}/data/${options.tableName}`)
    .once("value")
    .then((res) => {
      const arr = [];
      const map = res.val();
      for (const key in map) {
        const item = map[key];
        item.id = key;
        arr.push(item);
      }
      return arr;
    });
}

function create(options) {
  return firebaseInstance.firebase
    .database()
    .ref(`users/${window.user.uid}/data/${options.tableName}`)
    .push(options[options.entity]);
}

function update(options) {
  return firebaseInstance.firebase
    .database()
    .ref(`users/${window.user.uid}/data/${options.tableName}/${options.id}`)
    .set(options[options.entity], (error) => {
      if (error) {
        console.error(error);
      }
    });
}

function remove(options) {
  return firebaseInstance.firebase
    .database()
    .ref(`users/${window.user.uid}/data/${options.tableName}/${options.id}`)
    .remove();
}

function getEntityById(options) {
  return firebaseInstance.firebase
    .database()
    .ref(`users/${window.user.uid}/data/${options.tableName}/${options.id}`)
    .once("value")
    .then((res) => {
      return res.val();
    });
}

export default {
  getRef,
  get,
  create,
  update,
  remove,
  getEntityById,
};
